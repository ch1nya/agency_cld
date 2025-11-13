import React, { useState, useEffect, useRef } from 'react';
import { Brain, Zap, Target, Mail, ArrowRight, Menu, X, ChevronDown, Globe } from 'lucide-react';

// Языковые данные
const translations = {
    en: {
        nav: {
            about: 'About',
            models: 'Models',
            process: 'Process',
            contact: 'Contact'
        },
        hero: {
            title: ['Artificial', 'Intelligence', 'Innovation', 'Future'],
            subtitle: 'Transforming businesses with cutting-edge AI solutions',
            cta: 'Get Started'
        },
        about: {
            title: 'About Us',
            text: 'We are pioneering the future of artificial intelligence, creating solutions that empower businesses to achieve unprecedented growth and efficiency.',
            stats: [
                { number: '500+', label: 'Projects Completed' },
                { number: '50+', label: 'AI Models Deployed' },
                { number: '99.9%', label: 'Accuracy Rate' }
            ]
        },
        models: {
            title: 'Our AI Models',
            items: [
                {
                    title: 'Vision AI',
                    description: 'Advanced computer vision for image recognition and analysis',
                    features: [
                        'Object detection and tracking',
                        'Facial recognition',
                        'Image classification',
                        'Real-time processing'
                    ]
                },
                {
                    title: 'NLP Engine',
                    description: 'Natural language processing for text understanding',
                    features: [
                        'Sentiment analysis',
                        'Text generation',
                        'Language translation',
                        'Chatbot integration'
                    ]
                },
                {
                    title: 'Predictive AI',
                    description: 'Machine learning models for forecasting and predictions',
                    features: [
                        'Time series forecasting',
                        'Anomaly detection',
                        'Customer behavior prediction',
                        'Risk assessment'
                    ]
                }
            ],
            learnMore: 'Learn More',
            showLess: 'Show Less'
        },
        process: {
            title: 'Our Process',
            steps: [
                { number: '01', title: 'Discovery', text: 'Understanding your business needs' },
                { number: '02', title: 'Design', text: 'Creating tailored AI solutions' },
                { number: '03', title: 'Development', text: 'Building and training models' },
                { number: '04', title: 'Deployment', text: 'Launching and monitoring' }
            ]
        },
        contact: {
            title: 'Get In Touch',
            subtitle: 'Ready to transform your business with AI?',
            form: {
                name: 'Your Name',
                email: 'Your Email',
                message: 'Your Message',
                submit: 'Send Message'
            },
            success: {
                title: 'Thank you!',
                text: "We'll get back to you soon."
            }
        },
        footer: {
            description: 'Building the future with artificial intelligence',
            quickLinks: 'Quick Links',
            connect: 'Connect'
        }
    },
    ru: {
        nav: {
            about: 'О нас',
            models: 'Модели',
            process: 'Процесс',
            contact: 'Контакты'
        },
        hero: {
            title: ['Искусственный', 'Интеллект', 'Инновации', 'Будущее'],
            subtitle: 'Трансформируем бизнес с помощью передовых AI-решений',
            cta: 'Начать'
        },
        about: {
            title: 'О нас',
            text: 'Мы создаем будущее искусственного интеллекта, разрабатывая решения, которые помогают бизнесу достигать беспрецедентного роста и эффективности.',
            stats: [
                { number: '500+', label: 'Завершенных проектов' },
                { number: '50+', label: 'Развернутых AI-моделей' },
                { number: '99.9%', label: 'Точность' }
            ]
        },
        models: {
            title: 'Наши AI-модели',
            items: [
                {
                    title: 'Vision AI',
                    description: 'Продвинутое компьютерное зрение для распознавания изображений',
                    features: [
                        'Обнаружение и отслеживание объектов',
                        'Распознавание лиц',
                        'Классификация изображений',
                        'Обработка в реальном времени'
                    ]
                },
                {
                    title: 'NLP Engine',
                    description: 'Обработка естественного языка для понимания текста',
                    features: [
                        'Анализ тональности',
                        'Генерация текста',
                        'Перевод языков',
                        'Интеграция чат-ботов'
                    ]
                },
                {
                    title: 'Predictive AI',
                    description: 'Модели машинного обучения для прогнозирования',
                    features: [
                        'Прогнозирование временных рядов',
                        'Обнаружение аномалий',
                        'Прогноз поведения клиентов',
                        'Оценка рисков'
                    ]
                }
            ],
            learnMore: 'Подробнее',
            showLess: 'Скрыть'
        },
        process: {
            title: 'Наш процесс',
            steps: [
                { number: '01', title: 'Исследование', text: 'Понимание потребностей вашего бизнеса' },
                { number: '02', title: 'Проектирование', text: 'Создание индивидуальных AI-решений' },
                { number: '03', title: 'Разработка', text: 'Создание и обучение моделей' },
                { number: '04', title: 'Развертывание', text: 'Запуск и мониторинг' }
            ]
        },
        contact: {
            title: 'Связаться с нами',
            subtitle: 'Готовы трансформировать ваш бизнес с помощью AI?',
            form: {
                name: 'Ваше имя',
                email: 'Ваш email',
                message: 'Ваше сообщение',
                submit: 'Отправить'
            },
            success: {
                title: 'Спасибо!',
                text: 'Мы свяжемся с вами в ближайшее время.'
            }
        },
        footer: {
            description: 'Создаем будущее с искусственным интеллектом',
            quickLinks: 'Быстрые ссылки',
            connect: 'Связь'
        }
    }
};

// Компонент 3D AI Neural Network Animation
const NeuralNetworkAnimation = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationId;

        const setCanvasSize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        // Узлы нейронной сети
        class Node {
            constructor(x, y, z, layer) {
                this.x = x;
                this.y = y;
                this.z = z;
                this.layer = layer;
                this.baseX = x;
                this.baseY = y;
                this.baseZ = z;
                this.pulse = Math.random() * Math.PI * 2;
            }

            update(time) {
                this.pulse += 0.02;
                const pulseAmount = Math.sin(this.pulse) * 2;
                this.z = this.baseZ + pulseAmount;
            }

            project(width, height) {
                const scale = 200 / (200 + this.z);
                return {
                    x: this.x * scale + width / 2,
                    y: this.y * scale + height / 2,
                    scale: scale
                };
            }
        }

        // Создание слоев нейронной сети
        const layers = [5, 8, 8, 5];
        const nodes = [];
        const layerSpacing = 150;

        layers.forEach((nodeCount, layerIndex) => {
            const startX = -((layers.length - 1) * layerSpacing) / 2;
            const x = startX + layerIndex * layerSpacing;
            const nodeSpacing = 60;
            const startY = -((nodeCount - 1) * nodeSpacing) / 2;

            for (let i = 0; i < nodeCount; i++) {
                const y = startY + i * nodeSpacing;
                const z = (Math.random() - 0.5) * 50;
                nodes.push(new Node(x, y, z, layerIndex));
            }
        });

        // Создание связей между слоями
        const connections = [];
        let nodeIndex = 0;
        for (let layer = 0; layer < layers.length - 1; layer++) {
            const currentLayerSize = layers[layer];
            const nextLayerSize = layers[layer + 1];

            for (let i = 0; i < currentLayerSize; i++) {
                for (let j = 0; j < nextLayerSize; j++) {
                    connections.push({
                        from: nodeIndex + i,
                        to: nodeIndex + currentLayerSize + j,
                        activity: Math.random()
                    });
                }
            }
            nodeIndex += currentLayerSize;
        }

        let time = 0;
        let rotation = 0;

        const animate = () => {
            time += 0.016;
            rotation += 0.003;

            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const width = canvas.width;
            const height = canvas.height;

            // Обновление узлов
            nodes.forEach(node => node.update(time));

            // Применение вращения
            const rotatedNodes = nodes.map(node => {
                const cos = Math.cos(rotation);
                const sin = Math.sin(rotation);
                const x = node.x * cos - node.z * sin;
                const z = node.x * sin + node.z * cos;
                return {
                    x,
                    y: node.y,
                    z,
                    layer: node.layer,
                    project: (width, height) => {
                        const scale = 200 / (200 + z);
                        return {
                            x: x * scale + width / 2,
                            y: node.y * scale + height / 2,
                            scale: scale
                        };
                    }
                };
            });

            // Сортировка по глубине
            const sortedConnections = connections
                .map(conn => ({
                    ...conn,
                    avgZ: (rotatedNodes[conn.from].z + rotatedNodes[conn.to].z) / 2
                }))
                .sort((a, b) => a.avgZ - b.avgZ);

            // Рисование связей
            sortedConnections.forEach(conn => {
                const from = rotatedNodes[conn.from].project(width, height);
                const to = rotatedNodes[conn.to].project(width, height);

                conn.activity += (Math.random() - 0.5) * 0.1;
                conn.activity = Math.max(0, Math.min(1, conn.activity));

                const opacity = conn.activity * 0.3;
                const gradient = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
                gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
                gradient.addColorStop(0.5, `rgba(255, 0, 0, ${opacity * 1.5})`);
                gradient.addColorStop(1, `rgba(255, 255, 255, ${opacity})`);

                ctx.strokeStyle = gradient;
                ctx.lineWidth = conn.activity * 2;
                ctx.beginPath();
                ctx.moveTo(from.x, from.y);
                ctx.lineTo(to.x, to.y);
                ctx.stroke();
            });

            // Рисование узлов
            const sortedNodes = rotatedNodes
                .map((node, index) => ({ node, index }))
                .sort((a, b) => a.node.z - b.node.z);

            sortedNodes.forEach(({ node, index }) => {
                const pos = node.project(width, height);
                const size = 4 + pos.scale * 3;

                const brightness = (node.z + 100) / 200;
                const glow = Math.sin(time * 2 + index * 0.5) * 0.5 + 0.5;

                // Внешнее свечение
                const gradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, size * 3);
                gradient.addColorStop(0, `rgba(255, 0, 0, ${glow * 0.5})`);
                gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(pos.x, pos.y, size * 3, 0, Math.PI * 2);
                ctx.fill();

                // Основной узел
                ctx.fillStyle = `rgba(255, ${Math.floor(brightness * 50)}, ${Math.floor(brightness * 50)}, ${0.8 + glow * 0.2})`;
                ctx.beginPath();
                ctx.arc(pos.x, pos.y, size, 0, Math.PI * 2);
                ctx.fill();

                // Внутреннее ядро
                ctx.fillStyle = `rgba(255, 255, 255, ${glow})`;
                ctx.beginPath();
                ctx.arc(pos.x, pos.y, size * 0.4, 0, Math.PI * 2);
                ctx.fill();
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', setCanvasSize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return <canvas ref={canvasRef} className="neural-canvas" />;
};

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
const HeroSection = ({ t, lang }) => {
    const [textIndex, setTextIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTextIndex((prev) => (prev + 1) % t.hero.title.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [t.hero.title.length]);

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="hero">
            <NeuralNetworkAnimation />

            <div className="hero-content">
                <h1 className="hero-title">
                    {t.hero.title[0]}
                    <span className="animated-text" key={textIndex}>
            {t.hero.title[textIndex]}
          </span>
                </h1>
                <p className="hero-subtitle">
                    {t.hero.subtitle}
                </p>
                <button className="cta-button" onClick={() => scrollToSection('contact')}>
                    {t.hero.cta} <ArrowRight size={20} />
                </button>
            </div>

            <div className="scroll-indicator" onClick={() => scrollToSection('about')}>
                <ChevronDown size={32} />
            </div>
        </section>
    );
};

// Компонент About Section
const AboutSection = ({ t }) => {
    const [ref, isVisible] = useScrollAnimation();

    return (
        <section id="about" className="about" ref={ref}>
            <div className={`about-content ${isVisible ? 'visible' : ''}`}>
                <h2 className="section-title">{t.about.title}</h2>
                <p className="about-text">{t.about.text}</p>
                <div className="stats">
                    {t.about.stats.map((stat, idx) => (
                        <div key={idx} className="stat-item">
                            <h3>{stat.number}</h3>
                            <p>{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Компонент Model Card
const ModelCard = ({ model, index, t }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [ref, isVisible] = useScrollAnimation();

    const icons = [<Target size={48} />, <Brain size={48} />, <Zap size={48} />];

    return (
        <div
            ref={ref}
            className={`model-card ${isVisible ? 'visible' : ''}`}
            style={{ animationDelay: `${index * 0.2}s` }}
            onClick={() => setIsExpanded(!isExpanded)}
        >
            <div className="model-icon">
                {icons[index]}
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
                {isExpanded ? t.models.showLess : t.models.learnMore}
            </button>
        </div>
    );
};

// Компонент Models Section
const ModelsSection = ({ t }) => {
    return (
        <section id="models" className="models">
            <h2 className="section-title">{t.models.title}</h2>
            <div className="models-grid">
                {t.models.items.map((model, index) => (
                    <ModelCard key={index} model={model} index={index} t={t} />
                ))}
            </div>
        </section>
    );
};

// Компонент Process Section
const ProcessSection = ({ t }) => {
    const [ref, isVisible] = useScrollAnimation();

    return (
        <section id="process" className="process" ref={ref}>
            <h2 className="section-title">{t.process.title}</h2>
            <div className={`process-timeline ${isVisible ? 'visible' : ''}`}>
                {t.process.steps.map((step, index) => (
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
const ContactSection = ({ t }) => {
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
                <h2 className="section-title">{t.contact.title}</h2>
                <p className="contact-subtitle">{t.contact.subtitle}</p>

                {submitted ? (
                    <div className="success-message">
                        <h3>{t.contact.success.title}</h3>
                        <p>{t.contact.success.text}</p>
                    </div>
                ) : (
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder={t.contact.form.name}
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder={t.contact.form.email}
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <textarea
                            name="message"
                            placeholder={t.contact.form.message}
                            value={formData.message}
                            onChange={handleChange}
                            rows="5"
                            required
                        />
                        <button type="submit" className="submit-button">
                            {t.contact.form.submit} <Mail size={20} />
                        </button>
                    </form>
                )}
            </div>
        </section>
    );
};

// Компонент Footer
const Footer = ({ t }) => {
    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>AI Startup</h3>
                    <p>{t.footer.description}</p>
                </div>
                <div className="footer-section">
                    <h4>{t.footer.quickLinks}</h4>
                    <a onClick={() => scrollToSection('about')}>{t.nav.about}</a>
                    <a onClick={() => scrollToSection('models')}>{t.nav.models}</a>
                    <a onClick={() => scrollToSection('process')}>{t.nav.process}</a>
                    <a onClick={() => scrollToSection('contact')}>{t.nav.contact}</a>
                </div>
                <div className="footer-section">
                    <h4>{t.footer.connect}</h4>
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
    const [lang, setLang] = useState('en');
    const t = translations[lang];

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setMenuOpen(false);
    };

    const toggleLanguage = () => {
        setLang(lang === 'en' ? 'ru' : 'en');
    };

    return (
        <div className="app">
            <nav className="navbar">
                <div className="nav-logo">AI Startup</div>
                <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
                    <a onClick={() => scrollToSection('about')}>{t.nav.about}</a>
                    <a onClick={() => scrollToSection('models')}>{t.nav.models}</a>
                    <a onClick={() => scrollToSection('process')}>{t.nav.process}</a>
                    <a onClick={() => scrollToSection('contact')}>{t.nav.contact}</a>
                </div>
                <div className="nav-actions">
                    <button className="lang-button" onClick={toggleLanguage}>
                        <Globe size={20} />
                        <span>{lang === 'en' ? 'RU' : 'EN'}</span>
                    </button>
                    <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            <HeroSection t={t} lang={lang} />
            <AboutSection t={t} />
            <ModelsSection t={t} />
            <ProcessSection t={t} />
            <ContactSection t={t} />
            <Footer t={t} />

            <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html, body {
          width: 100%;
          height: 100%;
          overflow-x: hidden;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .app {
          width: 100%;
          background: #000000;
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
          background: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .nav-logo {
          font-size: 1.5rem;
          font-weight: 700;
          color: #ff0000;
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
          color: #ff0000;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .lang-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          color: white;
          cursor: pointer;
          transition: all 0.3s;
          font-weight: 500;
        }

        .lang-button:hover {
          border-color: #ff0000;
          color: #ff0000;
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

        .neural-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
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
          color: #ffffff;
        }

        .animated-text {
          display: block;
          color: #ff0000;
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
          background: #ff0000;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          animation: fadeInUp 1s ease-out 0.6s backwards;
        }

        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(255, 0, 0, 0.4);
          background: #cc0000;
        }

        .scroll-indicator {
          position: absolute;
          bottom: 2rem;
          z-index: 2;
          cursor: pointer;
          animation: bounce 2s infinite;
          color: rgba(255, 255, 255, 0.5);
          transition: color 0.3s;
        }

        .scroll-indicator:hover {
          color: #ff0000;
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
          background: #000000;
        }

        .about-content {
          max-width: 1200px;
          width: 100%;
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
          color: #ff0000;
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
          background: rgba(255, 0, 0, 0.05);
          border-color: rgba(255, 0, 0, 0.3);
        }

        .stat-item h3 {
          font-size: 3rem;
          color: #ff0000;
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
          background: #000000;
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
          border-color: rgba(255, 0, 0, 0.3);
          box-shadow: 0 20px 40px rgba(255, 0, 0, 0.2);
        }

        .model-icon {
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 0, 0, 0.1);
          border-radius: 20px;
          margin-bottom: 1.5rem;
          color: #ff0000;
          transition: all 0.3s ease;
        }

        .model-card:hover .model-icon {
          transform: scale(1.1) rotate(5deg);
          background: rgba(255, 0, 0, 0.2);
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
          color: #ff0000;
        }

        .model-button {
          margin-top: 1.5rem;
          padding: 0.8rem 1.5rem;
          background: transparent;
          border: 2px solid #ff0000;
          color: #ff0000;
          border-radius: 50px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
          width: 100%;
        }

        .model-button:hover {
          background: #ff0000;
          color: white;
        }

        /* Process Section */
        .process {
          padding: 8rem 5%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: #000000;
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
          background: linear-gradient(180deg, #ff0000, rgba(255, 0, 0, 0.3));
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
          background: #ff0000;
          border-radius: 50%;
          box-shadow: 0 10px 30px rgba(255, 0, 0, 0.3);
          color: white;
        }

        .step-content {
          flex: 1;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          transition: all 0.3s ease;
        }

        .step-content:hover {
          background: rgba(255, 0, 0, 0.05);
          border-color: rgba(255, 0, 0, 0.3);
        }

        .step-content h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          color: #ff0000;
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
          background: #000000;
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

        .contact-form input::placeholder,
        .contact-form textarea::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .contact-form input:focus,
        .contact-form textarea:focus {
          outline: none;
          border-color: #ff0000;
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
          background: #ff0000;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .submit-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(255, 0, 0, 0.4);
          background: #cc0000;
        }

        .success-message {
          text-align: center;
          padding: 3rem;
          background: rgba(255, 0, 0, 0.1);
          border: 1px solid rgba(255, 0, 0, 0.3);
          border-radius: 15px;
        }

        .success-message h3 {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: #ff0000;
        }

        .success-message p {
          color: rgba(255, 255, 255, 0.8);
        }

        /* Footer */
        .footer {
          padding: 4rem 5% 2rem;
          background: rgba(0, 0, 0, 0.5);
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
          color: #ff0000;
        }

        .footer-section p,
        .footer-section a {
          color: rgba(255, 255, 255, 0.6);
          line-height: 2;
          text-decoration: none;
          display: block;
          transition: color 0.3s;
          cursor: pointer;
        }

        .footer-section a:hover {
          color: #ff0000;
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
            background: rgba(0, 0, 0, 0.98);
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

          .lang-button span {
            display: none;
          }
        }

        /* Smooth Scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Selection Color */
        ::selection {
          background: rgba(255, 0, 0, 0.3);
          color: white;
        }

        /* Scrollbar Styling */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: #000000;
        }

        ::-webkit-scrollbar-thumb {
          background: #ff0000;
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #cc0000;
        }
      `}</style>
        </div>
    );
};

export default App;