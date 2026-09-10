// Canvas-based High-Res Holographic Badge Image Exporter
export const exportBadgeAsImage = (badge, userName = 'Cyber Agent') => {
  const canvas = document.createElement('canvas');
  canvas.width = 900;
  canvas.height = 1200;
  const ctx = canvas.getContext('2d');

  // 1. Dark Futuristic Cyberpunk Card Background
  const gradient = ctx.createLinearGradient(0, 0, 900, 1200);
  gradient.addColorStop(0, '#0a0614');
  gradient.addColorStop(0.5, '#16102b');
  gradient.addColorStop(1, '#090513');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 900, 1200);

  // 2. Cyber Grid lines
  ctx.strokeStyle = 'rgba(168, 85, 247, 0.12)';
  ctx.lineWidth = 1;
  for (let x = 0; x < 900; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 1200);
    ctx.stroke();
  }
  for (let y = 0; y < 1200; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(900, y);
    ctx.stroke();
  }

  // 3. Glowing Outer Border
  const badgeColor = badge.color || '#a855f7';
  ctx.strokeStyle = badgeColor;
  ctx.lineWidth = 6;
  ctx.shadowColor = badgeColor;
  ctx.shadowBlur = 30;
  ctx.strokeRect(30, 30, 840, 1140);
  ctx.shadowBlur = 0; // reset

  // Corner Accent Brackets
  const cornerSize = 40;
  ctx.fillStyle = badgeColor;
  // Top-left
  ctx.fillRect(30, 30, cornerSize, 6);
  ctx.fillRect(30, 30, 6, cornerSize);
  // Top-right
  ctx.fillRect(870 - cornerSize, 30, cornerSize, 6);
  ctx.fillRect(864, 30, 6, cornerSize);
  // Bottom-left
  ctx.fillRect(30, 1164, cornerSize, 6);
  ctx.fillRect(30, 1170 - cornerSize, 6, cornerSize);
  // Bottom-right
  ctx.fillRect(870 - cornerSize, 1164, cornerSize, 6);
  ctx.fillRect(864, 1170 - cornerSize, 6, cornerSize);

  // 4. Header: Platform Brand
  ctx.font = '700 24px "Orbitron", sans-serif';
  ctx.fillStyle = '#06b6d4';
  ctx.textAlign = 'center';
  ctx.fillText('DIGITAL SAFETY ESCAPE ROOM', 450, 100);

  ctx.font = '600 16px "JetBrains Mono", monospace';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.fillText('OFFICIAL CYBERSECURITY COMPETENCY BADGE', 450, 135);

  // 5. Central Insignia Circle
  ctx.beginPath();
  ctx.arc(450, 340, 140, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(168, 85, 247, 0.08)';
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = badgeColor;
  ctx.shadowColor = badgeColor;
  ctx.shadowBlur = 20;
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Inner Hexagon / Shield Accent
  ctx.font = '80px "JetBrains Mono", sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(badge.badgeType === 'grand_guardian' ? '🛡️' : '⚡', 450, 370);

  // 6. Badge Title
  ctx.font = '800 36px "Orbitron", sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.shadowColor = badgeColor;
  ctx.shadowBlur = 15;
  ctx.fillText((badge.title || 'TOPIC BADGE').toUpperCase(), 450, 540);
  ctx.shadowBlur = 0;

  ctx.font = '600 20px "JetBrains Mono", monospace';
  ctx.fillStyle = '#06b6d4';
  ctx.fillText((badge.category || 'Cyber Defense Program').toUpperCase(), 450, 580);

  // 7. Recipient
  ctx.font = '500 18px "Rajdhani", sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.fillText('AWARDED TO OPERATOR', 450, 650);

  ctx.font = '700 38px "Rajdhani", sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(userName, 450, 700);

  // Horizontal divider
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(200, 740);
  ctx.lineTo(700, 740);
  ctx.stroke();

  // 8. Performance Star Rating
  const stars = badge.starRating || 5;
  const starString = '★'.repeat(stars) + '☆'.repeat(5 - stars);
  ctx.font = '42px sans-serif';
  ctx.fillStyle = '#eab308'; // Gold
  ctx.fillText(starString, 450, 810);

  ctx.font = '600 18px "JetBrains Mono", monospace';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.fillText(`Score: ${badge.score || 7200} / ${badge.maxScore || 7500} (${badge.scorePercentage || 96}%)`, 450, 850);

  // 9. Stats Grid
  const statsY = 920;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.fillRect(150, statsY, 600, 90);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.strokeRect(150, statsY, 600, 90);

  ctx.font = '600 14px "JetBrains Mono", monospace';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.fillText('ACCURACY', 250, statsY + 35);
  ctx.fillText('GAMES CLEARED', 450, statsY + 35);
  ctx.fillText('STATUS', 650, statsY + 35);

  ctx.font = '700 20px "Orbitron", sans-serif';
  ctx.fillStyle = '#10b981';
  ctx.fillText(`${badge.stats?.accuracy || 95}%`, 250, statsY + 65);
  ctx.fillStyle = '#ffffff';
  ctx.fillText(`${badge.stats?.gamesCompleted || 5}/5`, 450, statsY + 65);
  ctx.fillStyle = '#38bdf8';
  ctx.fillText('CERTIFIED', 650, statsY + 65);

  // 10. Verification ID and Date
  const dateStr = new Date(badge.issuedAt || Date.now()).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  ctx.font = '500 16px "JetBrains Mono", monospace';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.fillText(`VERIFICATION ID: ${badge.verificationId || 'BADGE-SEC-9482X'}`, 450, 1070);
  ctx.fillText(`DATE ISSUED: ${dateStr}`, 450, 1100);

  // Trigger download
  const imageURI = canvas.toDataURL('image/png');
  const downloadLink = document.createElement('a');
  downloadLink.download = `${(badge.title || 'Cyber_Badge').replace(/\s+/g, '_')}.png`;
  downloadLink.href = imageURI;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};
