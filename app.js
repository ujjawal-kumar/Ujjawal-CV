document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // 1. EMBEDDED RESUME MARKDOWN (Offline & File Protocol Fallback)
    // -------------------------------------------------------------
    const markdownContent = `# UJJAWAL KUMAR
**AI Engineer (LLM & Application Development)**
Bangalore, India • +91-9431636985 • ujjawal@uohyd.ac.in
GitHub: https://github.com/ujjawal-kumar

---

## PROFESSIONAL SUMMARY
Passionate and results-oriented AI Engineer with 8 years of software engineering experience, including 2.5+ years of dedicated focus on building, optimizing, and deploying production-grade AI/LLM-powered applications. Expert in designing stateful multi-agent systems, Retrieval-Augmented Generation (RAG) pipelines, and high-performance Python backends. Highly skilled in writing clean, maintainable, and scalable code with a deep commitment to software engineering excellence, automated testing, and CI/CD/MLOps containerized workflows. 

---

## TECHNICAL SKILLS
* AI & LLM Frameworks: LangChain, LangGraph, LlamaIndex, CrewAI, Model Context Protocol (MCP), Prompt Engineering, RAG Architectures, Agentic Workflows.
* Core Languages & Backends: Python (FastAPI, Flask, Django), C++ (OOP, STL, C++11/14), Core Java, JavaScript, TypeScript, WebSockets.
* Machine Learning & CV: PyTorch, TensorFlow, Keras, OpenCV, MTCNN, Tiny-CLIP, ONNX, Scikit-learn, NLTK, Spacy.
* Vector Databases & Caching: Pinecone, Chroma, Milvus, Redis, SQLite, MySQL.
* DevOps & Cloud Tools: Docker, Kubernetes, Git, GitHub Actions (CI/CD), AWS, GCP, Azure, MLOps/LLMOps.
* Evaluation Frameworks: LangSmith, Ragas, TruLens (Evaluation and hallucination monitoring).

---

## PROFESSIONAL EXPERIENCE

### Virtusa, Bangalore
AI Engineer | Feb 2026 – Present
* AI & LLM Integration: Design, build, and optimize enterprise-grade GenAI applications utilizing OpenAI, Anthropic, and open-source models. Built advanced RAG systems and stateful multi-agent workflows with LangGraph and LangChain.
* Backend Application Development: Write clean, maintainable, and highly concurrent APIs using FastAPI and Flask, establishing modular Python backends to support low-latency AI features.
* Vector Databases & Caching: Managed data ingestion pipelines into Pinecone and Chroma vector databases. Integrated Redis caching, improving LLM query speed by 35% and reducing API costs.
* DevOps & MLOps: Engineered CI/CD pipelines via GitHub Actions, containerized backend services using Docker, and managed cloud infrastructure on AWS/Azure.
* Model Evaluation & Monitoring: Utilized LangSmith and Ragas to evaluate agentic trajectories, benchmark prompt performance, and track hallucination rates in production.

### Verificient Technologies Inc, Pune
Computer Vision & AI Engineer | March 2021 – Jan 2026
* Machine Learning & CV Systems: Developed and deployed production-grade computer vision applications, optimizing real-time object detection and classification models.
* LLM & Video Integration: Designed a native C++ addon leveraging small-scale LLMs (using GGML/GGUF) and Tiny-CLIP to enable natural language incident querying over video streams.
* Inference Optimization: Optimized inference pipelines with ONNX Runtime and C++, reducing frame processing latency by 40% and cutting GPU resource consumption.
* Cloud & Orchestration: Managed containerized microservices deployments on GCP and Azure using Kubernetes for scaling.
* Frontend Prototyping: Built interactive dashboards using JavaScript, HTML5, and CSS3 to visualize live AI inference, telemetry, and live camera feeds.

### Zen Technologies Limited, Hyderabad
Research Engineer - Software | Jul 2018 – Feb 2021
* Software Engineering: Wrote clean, object-oriented C++ and Python code for tactical defense simulator software, ensuring robust data structures and high-performance algorithms.
* Database & APIs: Designed relational database schemas in MySQL and SQLite for high-volume logs, event tracking, and automated performance report generation.
* Microservices: Engineered backend RESTful APIs using Django and Flask to decouple client applications from core computation engines.
* Collaboration: Collaborated with product managers and quality assurance teams to implement automated unit testing and robust integration suites.

---

## SELECTED PROJECTS

### Multi-Agent Research Ops Orchestrator
Technologies: LangGraph, LangChain, MCP, Python, Redis, Docker, LangSmith
* Architected a stateful multi-agent system using LangGraph to automate complex research and data retrieval workflows with cyclic error correction.
* Integrated Model Context Protocol (MCP) servers to decouple tool execution from reasoning, allowing agents to discover and consume database and filesystem tools.
* Developed persistent conversation memory and "Human-in-the-Loop" checkpoints, allowing administrative approvals on critical tool actions.
* Utilized LangSmith to evaluate agent trajectories, decreasing model hallucination rates and optimizing LLM token spend.

### LLM-Based Video Incident Analysis
Technologies: GGML, Tiny-CLIP, C++, ONNX, Node.js
* Designed and built a native desktop/web addon integrating a local small-scale LLM to enable natural-language search over live video.
* Aligned video frames with text prompt embeddings using Tiny-CLIP for real-time semantic incident classification.
* Implemented highly efficient C++ pipelines using GGML and ONNX for optimized CPU/GPU-split inference.

### Face Recognition Attendance System
Technologies: Flask, SQLite, WebSockets, OpenCV, MTCNN, Docker
* Engineered an automated attendance application utilizing MTCNN for face detection and transfer learning to train custom recognition models.
* Implemented real-time low-latency video streaming between the user's browser and the Flask backend using WebSockets.
* Packaged applications with Docker and deployed to a cloud server with automated database logging.

---

## EDUCATION
* M.Tech in Artificial Intelligence | University of Hyderabad (2016 – 2018) | GPA: 8.63/10.0
* B.Tech in Computer Science & Engineering | Guru Nanak Dev University (2012 – 2016) | GPA: 8.75/10.0

---

## ACHIEVEMENTS & AWARDS
* First Place: Won the 24-Hour University Hackathon hosted by Invesco Pvt Ltd at the University of Hyderabad.
* GATE Qualifier: Scored in the 97.8th percentile in GATE-2016 CS (conducted by IISc Bangalore).`;

    // -------------------------------------------------------------
    // 2. TAB CONTROLLER LOGIC
    // -------------------------------------------------------------
    const navButtons = document.querySelectorAll('.nav-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            
            // Remove active state from all buttons & panels
            navButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active state to selected button & panel
            button.classList.add('active');
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });

    // -------------------------------------------------------------
    // 3. ATS RESUME INJECTOR & CLIPBOARD COPY
    // -------------------------------------------------------------
    const markdownContainer = document.getElementById('markdown-code-block');
    const copyButton = document.getElementById('copy-markdown-btn');

    // First try fetching live file, fallback to embedded string on CORS / Offline
    if (markdownContainer) {
        fetch('resume.md')
            .then(res => {
                if (!res.ok) throw new Error('Failed to load file');
                return res.text();
            })
            .then(text => {
                markdownContainer.textContent = text;
            })
            .catch(() => {
                // CORS or file:// protocol block - use fallback
                markdownContainer.textContent = markdownContent;
            });
    }

    if (copyButton && markdownContainer) {
        copyButton.addEventListener('click', () => {
            const textToCopy = markdownContainer.textContent;
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    const originalHTML = copyButton.innerHTML;
                    copyButton.innerHTML = `
                        <svg class="icon" viewBox="0 0 24 24" style="fill: var(--bg-primary);"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                        <span>Copied!</span>
                    `;
                    copyButton.style.background = '#10b981'; // Green success state
                    copyButton.style.borderColor = '#10b981';
                    
                    setTimeout(() => {
                        copyButton.innerHTML = originalHTML;
                        copyButton.style.background = '';
                        copyButton.style.borderColor = '';
                    }, 2000);
                })
                .catch(err => {
                    console.error('Could not copy text: ', err);
                    alert('Failed to copy. Please select the text manually.');
                });
        });
    }
});
