package com.biblioteca.pdflibrarybackend.controller;

import com.biblioteca.pdflibrarybackend.entity.PdfDocument;
import com.biblioteca.pdflibrarybackend.service.PdfService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para la gestión de documentos PDF
 */
@RestController
@RequestMapping("/api/pdfs")
public class PdfController {
    
    private static final Logger log = LoggerFactory.getLogger(PdfController.class);
    
    private final PdfService pdfService;
    
    public PdfController(PdfService pdfService) {
        this.pdfService = pdfService;
    }
    
    /**
     * Obtener todos los documentos PDF
     * GET /api/pdfs
     */
    @GetMapping
    public ResponseEntity<List<PdfDocument>> getAllPdfs() {
        log.info("Solicitud GET: Obtener todos los PDFs");
        List<PdfDocument> pdfs = pdfService.getAllDocuments();
        return ResponseEntity.ok(pdfs);
    }
    
    /**
     * Obtener un documento específico por ID
     * GET /api/pdfs/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<PdfDocument> getPdfById(@PathVariable Long id) {
        log.info("Solicitud GET: Obtener PDF con ID {}", id);
        PdfDocument pdf = pdfService.getDocumentById(id);
        return ResponseEntity.ok(pdf);
    }
    
    /**
     * Obtener documentos por categoría
     * GET /api/pdfs/category/{category}
     */
    @GetMapping("/category/{category}")
    public ResponseEntity<List<PdfDocument>> getPdfsByCategory(@PathVariable String category) {
        log.info("Solicitud GET: Obtener PDFs de categoría {}", category);
        List<PdfDocument> pdfs = pdfService.getDocumentsByCategory(category);
        return ResponseEntity.ok(pdfs);
    }
    
    /**
     * Buscar documentos por título
     * GET /api/pdfs/search?title=texto
     */
    @GetMapping("/search")
    public ResponseEntity<List<PdfDocument>> searchPdfs(@RequestParam String title) {
        log.info("Solicitud GET: Buscar PDFs con título '{}'", title);
        List<PdfDocument> pdfs = pdfService.searchDocumentsByTitle(title);
        return ResponseEntity.ok(pdfs);
    }
    
    /**
     * Obtener todas las categorías disponibles
     * GET /api/pdfs/categories
     */
    @GetMapping("/categories")
    public ResponseEntity<List<String>> getAllCategories() {
        log.info("Solicitud GET: Obtener todas las categorías");
        List<String> categories = pdfService.getAllCategories();
        return ResponseEntity.ok(categories);
    }
    
    /**
     * Descargar/visualizar archivo PDF
     * GET /api/pdfs/download/{fileName}
     */
    @GetMapping("/download/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName) {
        log.info("Solicitud GET: Descargar archivo {}", fileName);
        
        Resource resource = pdfService.loadFileAsResource(fileName);
        
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + fileName + "\"")
                .body(resource);
    }
}