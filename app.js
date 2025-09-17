// Application Data
const appData = {
    institutions: [
        {name: "Ranchi University", type: "State University", status: "Verified", certificates: 45000, established: 1960},
        {name: "Birla Institute of Technology", type: "Private University", status: "Verified", certificates: 32000, established: 1955},
        {name: "National Institute of Technology Jamshedpur", type: "Central University", status: "Verified", certificates: 28000, established: 1960},
        {name: "Indian School of Mines Dhanbad", type: "Central University", status: "Verified", certificates: 25000, established: 1926},
        {name: "Jharkhand University of Technology", type: "State University", status: "Verified", certificates: 38000, established: 1986}
    ],
    verificationStats: {
        totalVerifications: 150000,
        fraudDetected: 12500,
        accuracyRate: 96.8,
        avgProcessingTime: "2.3 seconds",
        institutionsRegistered: 145,
        monthlyGrowth: 18.5
    },
    fraudPatterns: [
        {type: "Forged Signatures", frequency: 35, riskLevel: "High"},
        {type: "Invalid Certificate Numbers", frequency: 28, riskLevel: "High"},
        {type: "Non-existent Institutions", frequency: 22, riskLevel: "Critical"},
        {type: "Tampered Grades", frequency: 15, riskLevel: "Medium"}
    ],
    sampleCertificates: [
        {name: "Bachelor of Technology", institution: "BIT Mesra", year: 2023, rollNo: "BT/CSE/2019/001", status: "Authentic"},
        {name: "Master of Science", institution: "Ranchi University", year: 2022, rollNo: "MSC/PHY/2020/045", status: "Authentic"},
        {name: "Bachelor of Engineering", institution: "Fake Institute", year: 2023, rollNo: "BE/ME/2019/999", status: "Fraudulent"}
    ]
};

// DOM Elements
let currentSection = 'home';
let fraudChart = null;
let monthlyChart = null;

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeFileUpload();
    initializeRoleSelection();
    populateInstitutions();
    initializeCharts();
    populateActivityFeed();
});

// Navigation System
function initializeNavigation() {
    const navButtons = document.querySelectorAll('.header__nav-btn');
    const sections = document.querySelectorAll('.section');
    
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetSection = button.getAttribute('data-section');
            switchSection(targetSection);
            
            // Update active nav button
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
    
    // Initialize with home section active
    document.querySelector('[data-section="home"]').classList.add('active');
}

function switchSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
        currentSection = sectionId;
        
        // Trigger section-specific initialization
        if (sectionId === 'admin') {
            updateCharts();
        }
    }
}

// File Upload System
function initializeFileUpload() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const uploadProgress = document.getElementById('uploadProgress');
    const ocrPreview = document.getElementById('ocrPreview');
    const verifyBtn = document.getElementById('verifyBtn');
    
    // Drag and drop handlers
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--color-primary)';
        uploadArea.style.background = 'var(--color-bg-1)';
    });
    
    uploadArea.addEventListener('dragleave', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--color-border)';
        uploadArea.style.background = 'transparent';
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileUpload(files[0]);
        }
        uploadArea.style.borderColor = 'var(--color-border)';
        uploadArea.style.background = 'transparent';
    });
    
    // File input handler
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFileUpload(e.target.files[0]);
        }
    });
    
    // Verify button handler
    if (verifyBtn) {
        verifyBtn.addEventListener('click', startVerification);
    }
    
    // Hero section buttons
    document.querySelectorAll('[data-action="start-verification"]').forEach(btn => {
        btn.addEventListener('click', () => {
            switchSection('verify');
            document.querySelector('[data-section="verify"]').classList.add('active');
            document.querySelectorAll('.header__nav-btn').forEach(b => b.classList.remove('active'));
        });
    });
}

function handleFileUpload(file) {
    // Show upload progress
    document.querySelector('.upload-area__content').classList.add('hidden');
    document.getElementById('uploadProgress').classList.remove('hidden');
    
    // Simulate file processing
    const progressBar = document.querySelector('.progress-bar__fill');
    const uploadStatus = document.querySelector('.upload-status');
    
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            
            // Show OCR results after processing
            setTimeout(() => {
                showOCRResults(file.name);
                document.getElementById('uploadProgress').classList.add('hidden');
                document.querySelector('.upload-area__content').classList.remove('hidden');
                progressBar.style.width = '0%';
            }, 500);
        }
        
        progressBar.style.width = progress + '%';
        
        if (progress < 30) {
            uploadStatus.textContent = 'Uploading file...';
        } else if (progress < 60) {
            uploadStatus.textContent = 'Processing with OCR...';
        } else if (progress < 90) {
            uploadStatus.textContent = 'Extracting text data...';
        } else {
            uploadStatus.textContent = 'Completing analysis...';
        }
    }, 200);
}

function showOCRResults(fileName) {
    // Simulate OCR extraction based on sample data
    const sampleData = appData.sampleCertificates[Math.floor(Math.random() * appData.sampleCertificates.length)];
    
    document.getElementById('extractedName').textContent = 'Rahul Kumar Singh';
    document.getElementById('extractedRoll').textContent = sampleData.rollNo;
    document.getElementById('extractedInstitution').textContent = sampleData.institution;
    document.getElementById('extractedDegree').textContent = sampleData.name;
    document.getElementById('extractedYear').textContent = sampleData.year;
    
    document.getElementById('ocrPreview').classList.remove('hidden');
    
    // Store extracted data for verification
    window.extractedData = {
        name: 'Rahul Kumar Singh',
        rollNo: sampleData.rollNo,
        institution: sampleData.institution,
        degree: sampleData.name,
        year: sampleData.year,
        status: sampleData.status
    };
}

function startVerification() {
    const verificationResults = document.getElementById('verificationResults');
    const riskScore = document.getElementById('riskScore');
    const verificationStatus = document.getElementById('verificationStatus');
    
    verificationResults.classList.remove('hidden');
    
    // Animate verification process
    const detailItems = document.querySelectorAll('.detail-item .status');
    detailItems.forEach((item, index) => {
        setTimeout(() => {
            item.className = 'status status--success';
            item.textContent = 'Completed';
        }, (index + 1) * 800);
    });
    
    // Show final results
    setTimeout(() => {
        const extractedData = window.extractedData;
        let riskScoreValue, statusClass, statusText;
        
        if (extractedData.status === 'Authentic') {
            riskScoreValue = Math.floor(Math.random() * 20) + 5; // 5-25 (low risk)
            statusClass = 'status--success';
            statusText = 'Certificate Authentic';
        } else {
            riskScoreValue = Math.floor(Math.random() * 30) + 70; // 70-100 (high risk)
            statusClass = 'status--error';
            statusText = 'Potential Fraud Detected';
        }
        
        // Update risk score circle
        const circle = document.querySelector('.risk-score__circle');
        const number = document.querySelector('.risk-score__number');
        
        circle.style.background = `conic-gradient(var(--color-primary) ${riskScoreValue * 3.6}deg, var(--color-secondary) ${riskScoreValue * 3.6}deg)`;
        number.textContent = riskScoreValue;
        
        // Update status
        const statusElement = document.getElementById('verificationStatus').querySelector('.status');
        statusElement.className = `status ${statusClass}`;
        statusElement.textContent = statusText;
        
    }, 3500);
}

// Role Selection
function initializeRoleSelection() {
    const roleCards = document.querySelectorAll('.role-card');
    
    roleCards.forEach(card => {
        card.addEventListener('click', () => {
            const role = card.getAttribute('data-role');
            handleRoleSelection(role);
        });
    });
}

function handleRoleSelection(role) {
    // Show toast notification
    showToast(`Selected role: ${role.charAt(0).toUpperCase() + role.slice(1)}`);
    
    // Navigate to appropriate section
    switch(role) {
        case 'employer':
        case 'government':
            switchSection('verify');
            break;
        case 'institution':
            switchSection('institutions');
            break;
    }
    
    // Update navigation
    const targetBtn = document.querySelector(`[data-section="${role === 'employer' || role === 'government' ? 'verify' : 'institutions'}"]`);
    if (targetBtn) {
        document.querySelectorAll('.header__nav-btn').forEach(btn => btn.classList.remove('active'));
        targetBtn.classList.add('active');
    }
}

// Institution Management
function populateInstitutions() {
    const institutionList = document.getElementById('institutionList');
    if (!institutionList) return;
    
    institutionList.innerHTML = '';
    
    appData.institutions.forEach(institution => {
        const institutionItem = document.createElement('div');
        institutionItem.className = 'institution-item';
        
        institutionItem.innerHTML = `
            <div class="institution-info">
                <h4>${institution.name}</h4>
                <p>${institution.type} • Est. ${institution.established}</p>
            </div>
            <div class="institution-meta">
                <span class="certificate-count">${institution.certificates.toLocaleString()} certificates</span>
                <span class="status status--success">${institution.status}</span>
            </div>
        `;
        
        institutionList.appendChild(institutionItem);
    });
}

// Chart Management
function initializeCharts() {
    const fraudCtx = document.getElementById('fraudChart');
    const monthlyCtx = document.getElementById('monthlyChart');
    
    if (fraudCtx) {
        fraudChart = new Chart(fraudCtx, {
            type: 'doughnut',
            data: {
                labels: appData.fraudPatterns.map(p => p.type),
                datasets: [{
                    data: appData.fraudPatterns.map(p => p.frequency),
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    }
                }
            }
        });
    }
    
    if (monthlyCtx) {
        // Generate mock monthly data
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
        const verifications = months.map(() => Math.floor(Math.random() * 5000) + 15000);
        
        monthlyChart = new Chart(monthlyCtx, {
            type: 'line',
            data: {
                labels: months,
                datasets: [{
                    label: 'Verifications',
                    data: verifications,
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#1FB8CD',
                    pointRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value.toLocaleString();
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
}

function updateCharts() {
    // Update charts when admin section is shown
    if (fraudChart) {
        fraudChart.update();
    }
    if (monthlyChart) {
        monthlyChart.update();
    }
}

// Activity Feed
function populateActivityFeed() {
    const activityList = document.getElementById('activityList');
    if (!activityList) return;
    
    const activities = [
        {
            icon: 'verified_user',
            text: 'Certificate verified for Ranchi University graduate',
            time: '2 minutes ago',
            type: 'success'
        },
        {
            icon: 'warning',
            text: 'Suspicious certificate flagged from unknown institution',
            time: '5 minutes ago',
            type: 'warning'
        },
        {
            icon: 'add_circle',
            text: 'New institution registered: NIT Jamshedpur Extension',
            time: '15 minutes ago',
            type: 'info'
        },
        {
            icon: 'security',
            text: 'Fraud detection algorithm updated',
            time: '1 hour ago',
            type: 'info'
        },
        {
            icon: 'block',
            text: 'Fraudulent certificate blocked and reported',
            time: '2 hours ago',
            type: 'error'
        }
    ];
    
    activityList.innerHTML = '';
    
    activities.forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        
        activityItem.innerHTML = `
            <span class="material-icons" style="color: var(--color-${activity.type})">${activity.icon}</span>
            <span>${activity.text}</span>
            <span class="activity-time">${activity.time}</span>
        `;
        
        activityList.appendChild(activityItem);
    });
}

// Utility Functions
function showToast(message, type = 'info') {
    // Create toast notification
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--color-surface);
        color: var(--color-text);
        padding: var(--space-16);
        border-radius: var(--radius-base);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        border-left: 4px solid var(--color-primary);
        min-width: 300px;
        transform: translateX(100%);
        transition: transform var(--duration-normal) var(--ease-standard);
    `;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// QR Code Scanner Simulation
document.addEventListener('click', function(e) {
    if (e.target.closest('.qr-scanner button')) {
        simulateQRScan();
    }
});

function simulateQRScan() {
    showToast('QR Scanner activated. Point camera at QR code...', 'info');
    
    // Simulate scan result after delay
    setTimeout(() => {
        const isValid = Math.random() > 0.3; // 70% chance of valid certificate
        
        if (isValid) {
            showToast('QR Code verified! Certificate is authentic.', 'success');
        } else {
            showToast('QR Code verification failed. Invalid certificate.', 'error');
        }
    }, 3000);
}

// Download handlers
document.addEventListener('click', function(e) {
    if (e.target.textContent === 'Download Report') {
        downloadVerificationReport();
    } else if (e.target.textContent === 'Download Template') {
        downloadTemplate();
    }
});

function downloadVerificationReport() {
    // Simulate report download
    showToast('Verification report downloaded successfully!', 'success');
}

function downloadTemplate() {
    // Simulate template download
    showToast('Certificate upload template downloaded!', 'success');
}

// Flag suspicious documents
document.addEventListener('click', function(e) {
    if (e.target.textContent === 'Flag Suspicious') {
        flagSuspicious();
    }
});

function flagSuspicious() {
    showToast('Document flagged as suspicious. Authorities notified.', 'warning');
}

// Bulk upload simulation
document.addEventListener('click', function(e) {
    if (e.target.closest('.bulk-upload .btn--primary')) {
        simulateBulkUpload();
    }
});

function simulateBulkUpload() {
    showToast('Bulk upload started. Processing certificates...', 'info');
    
    setTimeout(() => {
        showToast('Bulk upload completed! 1,247 certificates processed.', 'success');
    }, 2000);
}

// Learn more handler
document.addEventListener('click', function(e) {
    if (e.target.closest('[data-action="learn-more"]')) {
        showSystemInfo();
    }
});

function showSystemInfo() {
    showToast('AI-powered system using OCR, blockchain, and machine learning for 96.8% accuracy!', 'info');
}

// Mobile menu toggle (for responsive design)
function toggleMobileMenu() {
    const nav = document.querySelector('.header__nav');
    nav.classList.toggle('mobile-open');
}

// Performance monitoring
let verificationCount = 0;
let fraudDetectionCount = 0;

function updateSystemStats() {
    verificationCount++;
    
    // Update stats in real-time
    const totalVerifications = document.querySelector('.stat-card__number');
    if (totalVerifications && totalVerifications.textContent.includes('150,000')) {
        const newCount = 150000 + verificationCount;
        totalVerifications.textContent = newCount.toLocaleString() + '+';
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case '1':
                e.preventDefault();
                switchSection('home');
                break;
            case '2':
                e.preventDefault();
                switchSection('verify');
                break;
            case '3':
                e.preventDefault();
                switchSection('institutions');
                break;
            case '4':
                e.preventDefault();
                switchSection('admin');
                break;
        }
    }
});

// Auto-refresh admin dashboard
setInterval(() => {
    if (currentSection === 'admin') {
        // Simulate real-time updates
        const randomActivity = [
            'New certificate verification completed',
            'Institution database updated',
            'Fraud pattern detected and analyzed',
            'System performance optimized'
        ];
        
        if (Math.random() > 0.7) { // 30% chance every 5 seconds
            const activity = randomActivity[Math.floor(Math.random() * randomActivity.length)];
            // Could add to activity feed here
        }
    }
}, 5000);

// Initialize tooltips and help text
document.addEventListener('mouseenter', function(e) {
    if (e.target.hasAttribute('title')) {
        // Could implement custom tooltips here
    }
});

// Export functions for testing
window.appFunctions = {
    switchSection,
    handleFileUpload,
    startVerification,
    showToast,
    updateSystemStats
};