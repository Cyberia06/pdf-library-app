package com.biblioteca.pdflibrarybackend.service;

import com.biblioteca.pdflibrarybackend.entity.PdfDocument;
import org.springframework.core.io.Resource;

import java.util.List;

/**
 * Servicio para gestión de documentos PDF
 */
public interface PdfService {
    
    /**
     * Obtener todos los documentos PDF
     */
    List<PdfDocument> getAllDocuments();
    
    /**
     * Obtener un documento por ID
     */
    PdfDocument getDocumentById(Long id);
    
    /**
     * Obtener documentos por categoría
     */
    List<PdfDocument> getDocumentsByCategory(String category);
    
    /**
     * Buscar documentos por título
     */
    List<PdfDocument> searchDocumentsByTitle(String title);
    
    /**
     * Cargar el archivo PDF como recurso
     */
    Resource loadFileAsResource(String fileName);
    
    /**
     * Obtener todas las categorías disponibles
     */
    List<String> getAllCategories();
}