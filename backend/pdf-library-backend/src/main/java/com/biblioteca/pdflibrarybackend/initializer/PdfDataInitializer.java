package com.biblioteca.pdflibrarybackend.initializer;

import com.biblioteca.pdflibrarybackend.entity.PdfDocument;
import com.biblioteca.pdflibrarybackend.repository.PdfDocumentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * Inicializador que escanea la carpeta de uploads y registra
 * automáticamente los PDFs en la base de datos
 */
@Component
public class PdfDataInitializer implements CommandLineRunner {
    
    private static final Logger log = LoggerFactory.getLogger(PdfDataInitializer.class);
    
    private final PdfDocumentRepository pdfRepository;
    
    @Value("${file.upload-dir}")
    private String uploadDir;
    
    public PdfDataInitializer(PdfDocumentRepository pdfRepository) {
        this.pdfRepository = pdfRepository;
    }
    
    @Override
    public void run(String... args) throws Exception {
        String separador = "=".repeat(60);
        log.info(separador);
        log.info("Iniciando escaneo de archivos PDF");
        log.info(separador);
        
        Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
        
        // Crear directorio si no existe
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
            log.info("✓ Directorio de uploads creado: {}", uploadPath);
            log.info("→ Agregá archivos PDF a esta carpeta y reiniciá la aplicación");
            return;
        }
        
        log.info("Escaneando directorio: {}", uploadPath);
        
        // Obtener archivos PDF
        File[] pdfFiles = uploadPath.toFile().listFiles((dir, name) -> 
            name.toLowerCase().endsWith(".pdf")
        );
        
        if (pdfFiles == null || pdfFiles.length == 0) {
            log.warn("⚠ No se encontraron archivos PDF en el directorio");
            log.info("→ Agregá archivos PDF a: {}", uploadPath);
            return;
        }
        
        int nuevosRegistros = 0;
        int registrosExistentes = 0;
        
        for (File file : pdfFiles) {
            String fileName = file.getName();
            
            // Verificar si ya existe en la base de datos
            if (pdfRepository.findByFileName(fileName).isPresent()) {
                registrosExistentes++;
                log.debug("⊗ Ya existe: {}", fileName);
                continue;
            }
            
            // Crear nuevo registro
            PdfDocument pdf = crearDocumentoDesdeArchivo(file);
            pdfRepository.save(pdf);
            nuevosRegistros++;
            
            String categoria = pdf.getCategory() != null ? pdf.getCategory() : "Sin categoría";
            long tamanhoKB = pdf.getFileSize() / 1024;
            log.info("✓ Registrado: {} | Categoría: {} | Tamaño: {} KB", 
                fileName, categoria, tamanhoKB);
        }
        
        // Resumen
        String linea = "-".repeat(60);
        log.info(linea);
        log.info("RESUMEN DEL ESCANEO:");
        log.info("  Nuevos PDFs registrados: {}", nuevosRegistros);
        log.info("  PDFs ya existentes: {}", registrosExistentes);
        log.info("  Total en base de datos: {}", pdfRepository.count());
        log.info(separador);
    }
    
    /**
     * Crea un objeto PdfDocument a partir de un archivo
     * Extrae metadatos del nombre del archivo
     */
    private PdfDocument crearDocumentoDesdeArchivo(File file) {
        PdfDocument pdf = new PdfDocument();
        String fileName = file.getName();
        
        pdf.setFileName(fileName);
        pdf.setFileSize(file.length());
        
        // Extraer información del nombre del archivo
        // Formato esperado: [Categoria] Titulo - Autor.pdf
        // O simplemente: Nombre del archivo.pdf
        
        String nombreSinExtension = fileName.substring(0, fileName.lastIndexOf(".pdf"));
        
        // Extraer categoría si existe (entre corchetes)
        if (nombreSinExtension.startsWith("[") && nombreSinExtension.contains("]")) {
            int finCorchete = nombreSinExtension.indexOf("]");
            String categoria = nombreSinExtension.substring(1, finCorchete).trim();
            pdf.setCategory(categoria);
            nombreSinExtension = nombreSinExtension.substring(finCorchete + 1).trim();
        }
        
        // Extraer autor si existe (después de un guión)
        if (nombreSinExtension.contains(" - ")) {
            String[] partes = nombreSinExtension.split(" - ", 2);
            pdf.setTitle(partes[0].trim());
            pdf.setAuthor(partes[1].trim());
            pdf.setOriginalFileName(partes[0].trim() + ".pdf");
        } else {
            pdf.setTitle(nombreSinExtension);
            pdf.setOriginalFileName(fileName);
        }
        
        // Descripción por defecto
        if (pdf.getCategory() != null) {
            pdf.setDescription("Documento de " + pdf.getCategory().toLowerCase());
        }
        
        return pdf;
    }
}