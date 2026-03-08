import { useState } from 'react';
import './index.css';
import { customMessages } from './customMessages';

function App() {
  const [name, setName] = useState('');
  const [submittedName, setSubmittedName] = useState('');
  const [message, setMessage] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const [isLoading, setIsLoading] = useState(false);



  const handleFocus = () => {
    setIsAnimating(true);
  };

  const handleBlur = () => {
    if (!name) setIsAnimating(false);
  };

  const [sparkleData] = useState(() => 
    [...Array(50)].map(() => ({
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 3,
      size: 0.5 + Math.random() * 1.5,
    }))
  );

  const fetchDynamicMessage = async () => {
    const defaultMessages = [
      "Happy Women's Day! May you continue to inspire those around you with your strength and grace.",
      "Here's to strong women: May we know them. May we be them. May we raise them. Happy Women's Day!",
      "Wishing you a day as beautiful and inspiring as you are. Happy Women's Day!",
      "Happy Women's Day! Your resilience, compassion, and courage make the world a better place.",
      "To all the incredible women, may you always shine bright and chase your dreams fearlessly. Happy Women's Day!",
      "Happy Women's Day! Keep shining, keep dreaming, and keep inspiring.",
      "A strong woman looks a challenge in the eye and gives it a wink. Happy Women's Day!",
      "Empowered women empower women. Happy Women's Day!",
      "Here’s to the women who have taught us to be fierce, compassionate, and unwavering. Happy Women's Day!",
      "There is no limit to what we, as women, can accomplish. Happy International Women's Day!",
      "Well-behaved women seldom make history. Happy Women's Day to all the trailblazers!",
      "Women are the real architects of society. Wishing you a beautiful Women's Day!",
      "Happy Women's Day! May you always find your voice and have the courage to use it.",
      "To the women who make our lives brighter every single day, Happy Women's Day!",
      "Feminism isn't about making women strong. Women are already strong. It's about changing the way the world perceives that strength.",
      "Happy Women's Day! Celebrate your uniqueness, your strength, and your journey.",
      "A woman with a voice is, by definition, a strong woman. Happy Women's Day!",
      "May your strength continue to grow and your spirit remain unbreakable. Happy Women's Day!",
      "Happy Women's Day! Your grace, elegance, and incredible strength are truly an inspiration.",
      "The world is a better place because of your presence. Happy Women's Day!",
      "Never apologize for being a powerful woman. Happy Women's Day!",
      "Happy Women's Day! To all the women who are chasing their dreams and making a difference.",
      "Your resilience is a beacon of hope for many. Have a wonderful and empowering Women's Day!",
      "Happy Women's Day! Keep breaking glass ceilings and paving the way for future generations.",
      "May you always know your worth and never settle for less. Happy International Women's Day!",
      "To every woman reading this: You are capable, you are strong, and you are enough. Happy Women's Day!",
      "Happy Women's Day! Let’s celebrate the incredible social, economic, cultural, and political achievements of women.",
      "Here's to the women who love, guide, and protect us. Wishing you a joyous Women's Day!",
      "You have within you the strength, the patience, and the passion to reach for the stars. Happy Women's Day!"
    ];
    
    // Simulate a short loading delay for effect
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return defaultMessages[Math.floor(Math.random() * defaultMessages.length)];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) return;
    
    setIsLoading(true);
    setSubmittedName(name);
    
    const lowerName = trimmedName.toLowerCase();
    
    if (customMessages[lowerName]) {
      const { messages, image } = customMessages[lowerName];
      const randomCustomMessage = messages[Math.floor(Math.random() * messages.length)];
      setMessage(randomCustomMessage);
      setAvatar(image);
      setIsLoading(false);
    } else {
      const dynamicMessage = await fetchDynamicMessage();
      setMessage(dynamicMessage);
      setAvatar(null);
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setName('');
    setSubmittedName('');
    setMessage('');
    setAvatar(null);
    setIsAnimating(false);
  };

  return (
    <div className="app-container">
      <div className={`card ${submittedName ? 'card-submitted' : ''}`}>
        {submittedName && avatar && !isLoading && (
          <div 
            className="card-background-image fade-in" 
            style={{ backgroundImage: `url("${avatar}")` }}
          >
            <div className="card-background-overlay"></div>
          </div>
        )}
        
        {!submittedName ? (
          <div className="form-section fade-in">
            <h1 className="title">Women's Day Wishes from Ramya</h1>
            <p className="subtitle">Enter your name to see it</p>
            <form onSubmit={handleSubmit} className="input-form">
              <div className={`input-group ${isAnimating ? 'active' : ''}`}>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  required
                />
                <label htmlFor="name" className={name || isAnimating ? 'float' : ''}>
                  Enter your name
                </label>
              </div>
              <button type="submit" className="submit-btn" disabled={isLoading}>
                <span>{isLoading ? 'Generating...' : 'See it'}</span>
              </button>
            </form>
          </div>
        ) : (
          <div className={`greeting-section fade-in ${avatar && !isLoading ? 'has-avatar' : ''}`}>
            <div className="greeting-content-wrapper">
              
              {isLoading ? (
                <div className="loading-spinner">✨ Finding the perfect wish... ✨</div>
              ) : (
                    <>
                      <div className="greeting-badge">🌸 Happy Women's Day 2026 🌸</div>
                  <h2 className="greeting-name">Hey {submittedName},</h2>
                  <p className="greeting-message">{message}</p>
                  <p className="signature">- Ramya M</p>
                  <button onClick={handleReset} className="reset-btn" aria-label="Go back">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="19" y1="12" x2="5" y2="12"></line>
                      <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>
        )}
        
        {/* Sparkles effect when submitted */}
        {submittedName && (
          <div className="sparkles-container">
            {sparkleData.map((data, i) => (
              <div 
                key={i} 
                className="falling-sparkle"
                style={{
                  left: `${data.left}%`,
                  animationDelay: `${data.delay}s`,
                  animationDuration: `${data.duration}s`,
                  fontSize: `${data.size}rem`
                }}
              >
                🌸
                {/* <span>✨</span> */}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Decorative background elements */}
      <div className="watermark fade-in">2026</div>
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>
    </div>
  );
}

export default App;
