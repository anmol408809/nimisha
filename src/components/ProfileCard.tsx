import React, { useRef, useEffect, useState } from 'react';
import ThreeAvatar from './ThreeAvatar';
import './ProfileCard.css';

interface ProfileCardProps {
  name: string;
  title: string;
  handle: string;
  status: string;
  contactText: string;
  showUserInfo?: boolean;
  enableTilt?: boolean;
  enableMobileTilt?: boolean;
  onContactClick?: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  title,
  handle,
  status,
  contactText,
  showUserInfo = true,
  enableTilt = true,
  enableMobileTilt = false,
  onContactClick
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isActive, setIsActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || (!enableTilt && !enableMobileTilt)) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableTilt) return;
      
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      setMousePosition({ x, y });
      
      const centerX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const centerY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      
      const rotateX = centerY * -8;
      const rotateY = centerX * 8;
      
      card.style.setProperty('--pointer-x', `${x}%`);
      card.style.setProperty('--pointer-y', `${y}%`);
      card.style.setProperty('--pointer-from-center', Math.sqrt(centerX ** 2 + centerY ** 2).toString());
      card.style.setProperty('--pointer-from-top', (y / 100).toString());
      card.style.setProperty('--pointer-from-left', (x / 100).toString());
      card.style.setProperty('--rotate-x', `${rotateY}deg`);
      card.style.setProperty('--rotate-y', `${rotateX}deg`);
      card.style.setProperty('--background-x', `${x}%`);
      card.style.setProperty('--background-y', `${y}%`);
    };

    const handleMouseEnter = () => {
      setIsActive(true);
      setIsHovered(true);
      card.classList.add('active');
    };

    const handleMouseLeave = () => {
      setIsActive(false);
      setIsHovered(false);
      card.classList.remove('active');
      card.style.setProperty('--pointer-x', '50%');
      card.style.setProperty('--pointer-y', '50%');
      card.style.setProperty('--pointer-from-center', '0');
      card.style.setProperty('--pointer-from-top', '0.5');
      card.style.setProperty('--pointer-from-left', '0.5');
      card.style.setProperty('--rotate-x', '0deg');
      card.style.setProperty('--rotate-y', '0deg');
      card.style.setProperty('--background-x', '50%');
      card.style.setProperty('--background-y', '50%');
      setMousePosition({ x: 50, y: 50 });
    };

    if (enableTilt) {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);
    }
    
    return () => {
      if (enableTilt && card) {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [enableTilt, enableMobileTilt, onContactClick, name, title]);

  const handleWave = () => {
    console.log('Avatar waved! (Callback received in ProfileCard)');
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onContactClick) {
      onContactClick();
    }
  };

  return (
    <div className="pc-card-wrapper" ref={cardRef}>
      <div className="pc-card">
        <div className="pc-inside"></div>
        <div className="pc-shine"></div>
        <div className="pc-glare"></div>
        <div className="pc-content">
          <div className="pc-details">
            <h3>{name}</h3>
            <p>{title}</p>
          </div>
        </div>
        
        <div className="pc-avatar-content">
          <div className="avatar">
            <ThreeAvatar 
              mousePosition={mousePosition} 
              onWave={handleWave}
              isHovered={isHovered}
            />
          </div>
        </div>

        {showUserInfo && (
          <div className="pc-user-info">
            <div className="pc-user-details">
              <div className="pc-mini-avatar">
                {/* FIX: Removed the second instance of <ThreeAvatar /> from here.
                  This was causing conflicts and preventing the main avatar from working correctly.
                  The div now correctly serves as a simple, decorative colored circle.
                */}
                <div style={{ 
                  width: '100%', 
                  height: '100%', 
                  borderRadius: '50%',
                  overflow: 'hidden',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                }}>
                </div>
              </div>
              <div className="pc-user-text">
                <div className="pc-handle">@{handle}</div>
                <div className="pc-status">{status}</div>
              </div>
            </div>
            <button 
              className="pc-contact-btn"
              onClick={handleContactClick}
              aria-label={`${contactText} - Contact ${name}`}
            >
              {contactText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
