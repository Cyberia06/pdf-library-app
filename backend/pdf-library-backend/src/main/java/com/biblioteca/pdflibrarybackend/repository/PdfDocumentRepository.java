package com.biblioteca.pdflibrarybackend.repository;

import com.biblioteca.pdflibrarybackend.entity.PdfDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repositorio para operaciones de base de datos con PdfDocument
 */
@Repository
public interface PdfDocumentRepository extends JpaRepository<PdfDocument, Long> {
    
    /**
     * Buscar un documento por nombre de archivo
     */
    Optional<PdfDocument> findByFileName(String fileName);
    
    /**
     * Buscar documentos por categoría
     */
    List<PdfDocument> findByCategory(String category);
    
    /**
     * Buscar documentos por título (búsqueda parcial, ignorando mayúsculas)
     */
    List<PdfDocument> findByTitleContainingIgnoreCase(String title);
    
    /**
     * Obtener todos los documentos ordenados por fecha de subida (más recientes primero)
     */
    List<PdfDocument> findAllByOrderByUploadDateDesc();
    
    /**
     * Buscar documentos por autor
     */
    List<PdfDocument> findByAuthorContainingIgnoreCase(String author);
}