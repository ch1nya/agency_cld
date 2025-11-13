import { useState, useEffect, useRef } from 'react';
import { Brain, Zap, Target, Mail, ArrowRight, Menu, X, ChevronDown } from 'lucide-react';

// Хук для анимации при скролле
const useScrollAnimation = () => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return [ref, isVisible];
};

// Компонент Hero Section
const HeroSection = () => {
    const [textIndex, setTextIndex] = useState(0);
    const texts = ['Intelligence', 'Innovation', 'Future'];

    useEffect(() => {
        const interval = setInterval(() => {
            setTextIndex((prev) => (prev + 1) % texts.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="hero">
            <div className="floating-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
            </div>

            <div className="hero-content">
                <h1 className="hero-title">
                    Artificial
                    <span className="animated-text" key={textIndex}>
            {texts[textIndex]}
          </span>
                </h1>
                <p className="hero-subtitle">
                    Transforming businesses with cutting-edge AI solutions
                </p>
                <button className="cta-button" onClick={() => scrollToSection('contact')}>
                    Get Started <ArrowRight size={20} />
                </button>
            </div>

            <div className="scroll-indicator" onClick={() => scrollToSection('about')}>
                <ChevronDown size={32} />
            </div>
        </section>
    );
};

// Компонент About Section
const AboutSection = () => {
    const [ref, isVisible] = useScrollAnimation();

    return (
        <section id="about" className="about" ref={ref}>
            <div className={`about-content ${isVisible ? 'visible' : ''}`}>
                <h2 className="section-title">About Us</h2>
                <p className="about-text">
                    We are pioneering the future of artificial intelligence, creating solutions
                    that empower businesses to achieve unprecedented growth and efficiency.
                </p>
                <div className="stats">
                    <div className="stat-item">
                        <h3>500+</h3>
                        <p>Projects Completed</p>
                    </div>
                    <div className="stat-item">
                        <h3>50+</h3>
                        <p>AI Models Deployed</p>
                    </div>
                    <div className="stat-item">
                        <h3>99.9%</h3>
                        <p>Accuracy Rate</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Компонент Model Card
const ModelCard = ({ model, index }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [ref, isVisible] = useScrollAnimation();

    return (
        <div
            ref={ref}
            className={`model-card ${isVisible ? 'visible' : ''}`}
            style={{ animationDelay: `${index * 0.2}s` }}
            onClick={() => setIsExpanded(!isExpanded)}
        >
            <div className="model-icon">
                {model.icon}
            </div>
            <h3 className="model-title">{model.title}</h3>
            <p className="model-description">{model.description}</p>

            <div className={`model-features ${isExpanded ? 'expanded' : ''}`}>
                <ul>
                    {model.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                    ))}
                </ul>
            </div>

            <button className="model-button">
                {isExpanded ? 'Show Less' : 'Learn More'}
            </button>
        </div>
    );
};

// Компонент Models Section
const ModelsSection = () => {
    const models = [
        {
            id: 1,
            title: 'Vision AI',
            description: 'Advanced computer vision for image recognition and analysis',
            icon: <Target size={48} />,
            features: [
                'Object detection and tracking',
                'Facial recognition',
                'Image classification',
                'Real-time processing'
            ]
        },
        {
            id: 2,
            title: 'NLP Engine',
            description: 'Natural language processing for text understanding',
            icon: <Brain size={48} />,
            features: [
                'Sentiment analysis',
                'Text generation',
                'Language translation',
                'Chatbot integration'
            ]
        },
        {
            id: 3,
            title: 'Predictive AI',
            description: 'Machine learning models for forecasting and predictions',
            icon: <Zap size={48} />,
            features: [
                'Time series forecasting',
                'Anomaly detection',
                'Customer behavior prediction',
                'Risk assessment'
            ]
        }
    ];

    return (
        <section id="models" className="models">
            <h2 className="section-title">Our AI Models</h2>
            <div className="models-grid">
                {models.map((model, index) => (
                    <ModelCard key={model.id} model={model} index={index} />
                ))}
            </div>
        </section>
    );
};

// Компонент Process Section
const ProcessSection = () => {
    const [ref, isVisible] = useScrollAnimation();

    const steps = [
        { number: '01', title: 'Discovery', text: 'Understanding your business needs' },
        { number: '02', title: 'Design', text: 'Creating tailored AI solutions' },
        { number: '03', title: 'Development', text: 'Building and training models' },
        { number: '04', title: 'Deployment', text: 'Launching and monitoring' }
    ];

    return (
        <section id="process" className="process" ref={ref}>
            <h2 className="section-title">Our Process</h2>
            <div className={`process-timeline ${isVisible ? 'visible' : ''}`}>
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className="process-step"
                        style={{ animationDelay: `${index * 0.3}s` }}
                    >
                        <div className="step-number">{step.number}</div>
                        <div className="step-content">
                            <h3>{step.title}</h3>
                            <p>{step.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

// Компонент Contact Section
const ContactSection = () => {
    const [ref, isVisible] = useScrollAnimation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', message: '' });
        }, 3000);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section id="contact" className="contact" ref={ref}>
            <div className={`contact-content ${isVisible ? 'visible' : ''}`}>
                <h2 className="section-title">Get In Touch</h2>
                <p className="contact-subtitle">Ready to transform your business with AI?</p>

                {submitted ? (
                    <div className="success-message">
                        <h3>Thank you!</h3>
                        <p>We'll get back to you soon.</p>
                    </div>
                ) : (
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <textarea
                            name="message"
                            placeholder="Your Message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="5"
                            required
                        />
                        <button type="submit" className="submit-button">
                            Send Message <Mail size={20} />
                        </button>
                    </form>
                )}
            </div>
        </section>
    );
};

// Компонент Footer
const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>AI Startup</h3>
                    <p>Building the future with artificial intelligence</p>
                </div>
                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <a href="#about">About</a>
                    <a href="#models">Models</a>
                    <a href="#process">Process</a>
                    <a href="#contact">Contact</a>
                </div>
                <div className="footer-section">
                    <h4>Connect</h4>
                    <p>info@aistartup.com</p>
                    <p>+1 (555) 123-4567</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 AI Startup. All rights reserved.</p>
            </div>
        </footer>
    );
};

// Главный компонент
const App = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setMenuOpen(false);
    };

    return (
        <div className="app">
            <nav className="navbar">
                <div className="nav-logo">AI Startup</div>
                <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
                    <a onClick={() => scrollToSection('about')}>About</a>
                    <a onClick={() => scrollToSection('models')}>Models</a>
                    <a onClick={() => scrollToSection('process')}>Process</a>
                    <a onClick={() => scrollToSection('contact')}>Contact</a>
                </div>
                <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            <HeroSection />
            <AboutSection />
            <ModelsSection />
            <ProcessSection />
            <ContactSection />
            <Footer />

            <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          overflow-x: hidden;
        }

        .app {
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
          color: #ffffff;
          min-height: 100vh;
        }

        /* Navbar */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 5%;
          background: rgba(10, 10, 10, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .nav-logo {
          font-size: 1.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
        }

        .nav-links a {
          color: #ffffff;
          text-decoration: none;
          cursor: pointer;
          transition: color 0.3s;
          font-weight: 500;
        }

        .nav-links a:hover {
          color: #667eea;
        }

        .menu-button {
          display: none;
          background: none;
          border: none;
          color: white;
          cursor: pointer;
        }

        /* Hero Section */
        .hero {
          position: relative;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          padding-top: 80px;
        }

        .floating-shapes {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .shape {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
          animation: float 20s infinite ease-in-out;
        }

        .shape-1 {
          width: 300px;
          height: 300px;
          top: 10%;
          left: 10%;
          animation-delay: 0s;
        }

        .shape-2 {
          width: 200px;
          height: 200px;
          top: 60%;
          right: 15%;
          animation-delay: 5s;
        }

        .shape-3 {
          width: 150px;
          height: 150px;
          bottom: 20%;
          left: 60%;
          animation-delay: 10s;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -50px) rotate(120deg); }
          66% { transform: translate(-20px, 30px) rotate(240deg); }
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 1000px;
          padding: 0 2rem;
          animation: fadeInUp 1s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-title {
          font-size: clamp(2.5rem, 8vw, 6rem);
          font-weight: 800;
          margin-bottom: 1rem;
          line-height: 1.1;
        }

        .animated-text {
          display: block;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: slideIn 0.6s ease-out;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .hero-subtitle {
          font-size: clamp(1rem, 2vw, 1.5rem);
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 2rem;
          animation: fadeInUp 1s ease-out 0.3s backwards;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2.5rem;
          font-size: 1.1rem;
          font-weight: 600;
          color: white;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          animation: fadeInUp 1s ease-out 0.6s backwards;
        }

        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
        }

        .scroll-indicator {
          position: absolute;
          bottom: 2rem;
          cursor: pointer;
          animation: bounce 2s infinite;
          color: rgba(255, 255, 255, 0.5);
          transition: color 0.3s;
        }

        .scroll-indicator:hover {
          color: #667eea;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }

        /* About Section */
        .about {
          padding: 8rem 5%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .about-content {
          max-width: 1200px;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease;
        }

        .about-content.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .section-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 700;
          margin-bottom: 2rem;
          text-align: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .about-text {
          font-size: 1.3rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.8);
          text-align: center;
          margin-bottom: 4rem;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 3rem;
          margin-top: 4rem;
        }

        .stat-item {
          text-align: center;
          padding: 2rem;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .stat-item:hover {
          transform: translateY(-5px);
          background: rgba(102, 126, 234, 0.1);
          border-color: rgba(102, 126, 234, 0.3);
        }

        .stat-item h3 {
          font-size: 3rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.5rem;
        }

        .stat-item p {
          color: rgba(255, 255, 255, 0.7);
          font-size: 1.1rem;
        }

        /* Models Section */
        .models {
          padding: 8rem 5%;
          min-height: 100vh;
        }

        .models-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
          margin-top: 4rem;
        }

        .model-card {
          padding: 2.5rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.4s ease;
          opacity: 0;
          transform: translateY(30px);
        }

        .model-card.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .model-card:hover {
          transform: translateY(-10px);
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(102, 126, 234, 0.3);
          box-shadow: 0 20px 40px rgba(102, 126, 234, 0.2);
        }

        .model-icon {
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2));
          border-radius: 20px;
          margin-bottom: 1.5rem;
          color: #667eea;
          transition: all 0.3s ease;
        }

        .model-card:hover .model-icon {
          transform: scale(1.1) rotate(5deg);
        }

        .model-title {
          font-size: 1.8rem;
          margin-bottom: 1rem;
          color: #ffffff;
        }

        .model-description {
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .model-features {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.5s ease;
        }

        .model-features.expanded {
          max-height: 300px;
          margin-top: 1.5rem;
        }

        .model-features ul {
          list-style: none;
          padding: 0;
        }

        .model-features li {
          padding: 0.5rem 0;
          padding-left: 1.5rem;
          position: relative;
          color: rgba(255, 255, 255, 0.8);
        }

        .model-features li:before {
          content: "→";
          position: absolute;
          left: 0;
          color: #667eea;
        }

        .model-button {
          margin-top: 1.5rem;
          padding: 0.8rem 1.5rem;
          background: transparent;
          border: 2px solid #667eea;
          color: #667eea;
          border-radius: 50px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
          width: 100%;
        }

        .model-button:hover {
          background: #667eea;
          color: white;
        }

        /* Process Section */
        .process {
          padding: 8rem 5%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .process-timeline {
          max-width: 1000px;
          margin: 4rem auto 0;
          position: relative;
        }

        .process-timeline:before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 2px;
          height: 100%;
          background: linear-gradient(180deg, #667eea, #764ba2);
          opacity: 0.3;
        }

        .process-step {
          display: flex;
          gap: 2rem;
          margin-bottom: 4rem;
          opacity: 0;
          transform: translateX(-30px);
          transition: all 0.6s ease;
        }

        .process-timeline.visible .process-step {
          opacity: 1;
          transform: translateX(0);
        }

        .process-step:nth-child(even) {
          flex-direction: row-reverse;
          transform: translateX(30px);
        }

        .step-number {
          flex-shrink: 0;
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 50%;
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }

        .step-content {
          flex: 1;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 15px;
        }

        .step-content h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          color: #667eea;
        }

        .step-content p {
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
        }

        /* Contact Section */
        .contact {
          padding: 8rem 5%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .contact-content {
          max-width: 600px;
          width: 100%;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease;
        }

        .contact-content.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .contact-subtitle {
          text-align: center;
          color: rgba(255, 255, 255, 0.7);
          font-size: 1.2rem;
          margin-bottom: 3rem;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .contact-form input,
        .contact-form textarea {
          padding: 1.2rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          color: white;
          font-size: 1rem;
          font-family: inherit;
          transition: all 0.3s ease;
        }

        .contact-form input:focus,
        .contact-form textarea:focus {
          outline: none;
          border-color: #667eea;
          background: rgba(255, 255, 255, 0.08);
        }

        .contact-form textarea {
          resize: vertical;
          min-height: 150px;
        }

        .submit-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 1.2rem;
          font-size: 1.1rem;
          font-weight: 600;
          color: white;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .submit-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
        }

        .success-message {
          text-align: center;
          padding: 3rem;
          background: rgba(102, 126, 234, 0.1);
          border: 1px solid rgba(102, 126, 234, 0.3);
          border-radius: 15px;
        }

        .success-message h3 {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: #667eea;
        }

        /* Footer */
        .footer {
          padding: 4rem 5% 2rem;
          background: rgba(0, 0, 0, 0.3);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 3rem;
          max-width: 1200px;
          margin: 0 auto 3rem;
        }

        .footer-section h3,
        .footer-section h4 {
          margin-bottom: 1rem;
          color: #667eea;
        }

        .footer-section p,
        .footer-section a {
          color: rgba(255, 255, 255, 0.6);
          line-height: 2;
          text-decoration: none;
          display: block;
          transition: color 0.3s;
        }

        .footer-section a:hover {
          color: #667eea;
        }

        .footer-bottom {
          text-align: center;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.5);
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .nav-links {
            position: fixed;
            top: 80px;
            right: -100%;
            width: 100%;
            height: calc(100vh - 80px);
            background: rgba(10, 10, 10, 0.98);
            flex-direction: column;
            align-items: center;
            justify-content: center;
            transition: right 0.3s ease;
            gap: 3rem;
          }

          .nav-links.active {
            right: 0;
          }

          .menu-button {
            display: block;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .about, .models, .process, .contact {
            padding: 5rem 5%;
          }

          .stats {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .models-grid {
            grid-template-columns: 1fr;
          }

          .process-timeline:before {
            left: 20px;
          }

          .process-step,
          .process-step:nth-child(even) {
            flex-direction: row;
            transform: translateX(0) !important;
          }

          .step-number {
            width: 60px;
            height: 60px;
            font-size: 1.2rem;
          }

          .footer-content {
            grid-template-columns: 1fr;
            gap: 2rem;
            text-align: center;
          }
        }

        /* Smooth Scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Selection Color */
        ::selection {
          background: rgba(102, 126, 234, 0.3);
          color: white;
        }

        /* Scrollbar Styling */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: #0a0a0a;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #667eea, #764ba2);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #667eea;
        }
      `}</style>
        </div>
    );
};

export default App;