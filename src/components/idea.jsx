import React, { useState, useEffect } from "react";

export default function Idea() {
  const [step, setStep] = useState(0);
  const [fade, setFade] = useState(true);

  // Kumaoni-style messages
  const messages = [
    {
      title: "Tumri baat chit badi yaad aunchha 😢",
      content: "Kain itna ignore karno cha?",
      button: "NHi Karni"
    },
    {
      title: "Tumri aur meri yaari moolya cha 💖",
      content: "Yaar, kam se kam baat ta karla",
      button: "Nahi karni"
    },
    {
      title: "Baira dabav ni cha 🌼",
      content: "Samajh cha, baira kyu na karni",
      button: "My Wish"
    },
    {
      title: "🤝",
      content: "Main itna kharab cha kya ki baat ni aau?",
      button: "Nahi ata"
    },
    {
      title: "Baira ignore ni karla",
      content: "Bhatt khana hajam ni huni tigi",
      button: "Please karlo"
    },
    {
        title: "Kya itna bura hu?",
        content : "Itna bura bhi nhi hu ki ignore karna pade",
        button: " ha Bura hai"
    },
    {
        title: "Na bura ni hu",
        content: " i dont know how to talk to girls",
        button: "I know"
    }
  ];

  useEffect(() => {
    setFade(false);
    const timer = setTimeout(() => setFade(true), 10);
    return () => clearTimeout(timer);
  }, [step]);

  const handleNext = () => {
    // Loop last two questions forever
    if (step < messages.length - 2) {
      setStep(step + 1);
    } else {
      setStep(messages.length - 2);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.background}></div>
      
      <div 
        style={{
          ...styles.card,
          opacity: fade ? 1 : 0,
          transform: fade ? 'translateY(0)' : 'translateY(20px)',
        }}
      >
        <div style={styles.header}>
          <h1 style={styles.title}>{messages[step].title}</h1>
          <div style={styles.heartContainer}>
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                style={{
                  ...styles.heart,
                  opacity: step >= i ? 1 : 0.3,
                  animation: step >= i ? `pulse 2s infinite ${i * 0.3}s` : 'none'
                }}
              >❤️</div>
            ))}
          </div>
        </div>
        
        <p style={styles.message}>{messages[step].content}</p>

        <button onClick={handleNext} style={styles.button}>
          {messages[step].button}
        </button>

        <a
          href="https://wa.me/7976045853"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            ...styles.button,
            marginTop: '15px',
            backgroundColor: '#25D366'
          }}
        >
           bat karte hai
        </a>
      </div>
      
      <div style={styles.footer}>
        <p style={styles.footerText}>Made with sincerity and respect</p>
      </div>
      
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
          }
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
        `}
      </style>
    </div>
  );
}

const styles = {
  container: {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff5f7',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    overflow: 'hidden',
    padding: '20px',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, #ffafbd 0%, #ffc3a0 100%)',
    opacity: 0.7,
    zIndex: 0,
  },
  card: {
    position: 'relative',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    padding: '40px',
    maxWidth: '500px',
    width: '100%',
    textAlign: 'center',
    transition: 'all 0.5s ease',
    zIndex: 1,
  },
  header: {
    marginBottom: '30px',
  },
  title: {
    color: '#e91e63',
    fontSize: '2rem',
    marginBottom: '20px',
    fontWeight: 600,
  },
  heartContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '20px',
  },
  heart: {
    fontSize: '1.8rem',
    transition: 'all 0.3s ease',
  },
  message: {
    color: '#555',
    fontSize: '1.2rem',
    lineHeight: 1.6,
    marginBottom: '30px',
  },
  button: {
    backgroundColor: '#e91e63',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    padding: '12px 30px',
    fontSize: '1.1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(233, 30, 99, 0.3)',
    textDecoration: 'none',
    display: 'inline-block',
  },
  footer: {
    position: 'absolute',
    bottom: '20px',
    color: '#777',
    fontSize: '0.9rem',
    zIndex: 1,
  },
  footerText: {
    opacity: 0.7,
  }
};
