package com.biblioteca.pdflibrarybackend.service.impl;

import com.biblioteca.pdflibrarybackend.entity.PdfDocument;
import com.biblioteca.pdflibrarybackend.repository.PdfDocumentRepository;
import com.biblioteca.pdflibrarybackend.service.PdfService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Implementación del servicio de gestión de PDFs
 */
@Service
public class PdfServiceImpl implements PdfService {
    
    private static final Logger log = LoggerFactory.getLogger(PdfServiceImpl.class);
    
    private final PdfDocumentRepository pdfRepository;
    
    @Value("${file.upload-dir}")
    private String uploadDir;
    
    public PdfServiceImpl(PdfDocumentRepository pdfRepository) {
        this.pdfRepository = pdfRepository;
    }
    
    @Override
    public List<PdfDocument> getAllDocuments() {
        log.info("Obteniendo todos los documentos PDF");
        return pdfRepository.findAllByOrderByUploadDateDesc();
    }
    
    @Override
    public PdfDocument getDocumentById(Long id) {
        log.info("Buscando documento con ID: {}", id);
        return pdfRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Documento no encontrado con ID: " + id));
    }
    
    @Override
    public List<PdfDocument> getDocumentsByCategory(String category) {
        log.info("Buscando documentos por categoría: {}", category);
        return pdfRepository.findByCategory(category);
    }
    
    @Override
    public List<PdfDocument> searchDocumentsByTitle(String title) {
        log.info("Buscando documentos por título: {}", title);
        return pdfRepository.findByTitleContainingIgnoreCase(title);
    }
    
    @Override
    public Resource loadFileAsResource(String fileName) {
        try {
            Path filePath = Paths.get(uploadDir).resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            
            if (resource.exists() && resource.isReadable()) {
                log.info("Archivo cargado exitosamente: {}", fileName);
                return resource;
            } else {
                log.error("Archivo no encontrado o no legible: {}", fileName);
                throw new RuntimeException("Archivo no encontrado: " + fileName);
            }
        } catch (MalformedURLException e) {
            log.error("Error al cargar archivo: {}", fileName, e);
            throw new RuntimeException("Error al cargar archivo: " + fileName, e);
        }
    }
    
    @Override
    public List<String> getAllCategories() {
        log.info("Obteniendo todas las categorías");
        return pdfRepository.findAll().stream()
                .map(PdfDocument::getCategory)
                .filter(category -> category != null && !category.isEmpty())
                .distinct()
                .sorted()
                .collect(Collectors.toList());
    }
}