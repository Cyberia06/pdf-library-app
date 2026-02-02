package com.biblioteca.pdflibrarybackend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * Entidad que representa un documento PDF en la base de datos
 */
@Entity
@Table(name = "pdf_documents")
public class PdfDocument {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String fileName;
    
    @Column(nullable = false)
    private String originalFileName;
    
    private String title;
    
    @Column(length = 500)
    private String description;
    
    private String category;
    
    private String author;
    
    private Long fileSize;
    
    @Column(nullable = false)
    private LocalDateTime uploadDate;
    
    private Integer pageCount;
    
    // Constructores
    public PdfDocument() {
    }
    
    public PdfDocument(Long id, String fileName, String originalFileName, String title, 
                       String description, String category, String author, Long fileSize, 
                       LocalDateTime uploadDate, Integer pageCount) {
        this.id = id;
        this.fileName = fileName;
        this.originalFileName = originalFileName;
        this.title = title;
        this.description = description;
        this.category = category;
        this.author = author;
        this.fileSize = fileSize;
        this.uploadDate = uploadDate;
        this.pageCount = pageCount;
    }
    
    // Getters
    public Long getId() {
        return id;
    }
    
    public String getFileName() {
        return fileName;
    }
    
    public String getOriginalFileName() {
        return originalFileName;
    }
    
    public String getTitle() {
        return title;
    }
    
    public String getDescription() {
        return description;
    }
    
    public String getCategory() {
        return category;
    }
    
    public String getAuthor() {
        return author;
    }
    
    public Long getFileSize() {
        return fileSize;
    }
    
    public LocalDateTime getUploadDate() {
        return uploadDate;
    }
    
    public Integer getPageCount() {
        return pageCount;
    }
    
    // Setters
    public void setId(Long id) {
        this.id = id;
    }
    
    public void setFileName(String fileName) {
        this.fileName = fileName;
    }
    
    public void setOriginalFileName(String originalFileName) {
        this.originalFileName = originalFileName;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public void setCategory(String category) {
        this.category = category;
    }
    
    public void setAuthor(String author) {
        this.author = author;
    }
    
    public void setFileSize(Long fileSize) {
        this.fileSize = fileSize;
    }
    
    public void setUploadDate(LocalDateTime uploadDate) {
        this.uploadDate = uploadDate;
    }
    
    public void setPageCount(Integer pageCount) {
        this.pageCount = pageCount;
    }
    
    @PrePersist
    protected void onCreate() {
        if (uploadDate == null) {
            uploadDate = LocalDateTime.now();
        }
    }
    
    @Override
    public String toString() {
        return "PdfDocument{" +
                "id=" + id +
                ", fileName='" + fileName + '\'' +
                ", title='" + title + '\'' +
                ", category='" + category + '\'' +
                '}';
    }
}