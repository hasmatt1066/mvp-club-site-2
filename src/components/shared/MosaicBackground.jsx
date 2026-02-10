import React from 'react';

const MosaicBackground = ({
  className = "absolute top-0 right-0 bottom-0 w-full pointer-events-none",
  style = { opacity: 0.07 },
  ...props
}) => {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 120 40"
      preserveAspectRatio="xMaxYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Row 0 */}
      <rect x="62" y="0" width="3.5" height="3.5" rx="0.6" fill="#a8c4d8"/>
      <rect x="78" y="0" width="3.5" height="3.5" rx="0.6" fill="#1a365d"/>
      <rect x="82" y="0" width="3.5" height="3.5" rx="0.6" fill="#a8c4d8"/>
      <rect x="90" y="0" width="3.5" height="3.5" rx="0.6" fill="#115e59"/>
      <rect x="94" y="0" width="3.5" height="3.5" rx="0.6" fill="#1a365d"/>
      <rect x="98" y="0" width="3.5" height="3.5" rx="0.6" fill="#d97706"/>
      <rect x="102" y="0" width="3.5" height="3.5" rx="0.6" fill="#a8c4d8"/>
      <rect x="106" y="0" width="3.5" height="3.5" rx="0.6" fill="#1a365d"/>
      <rect x="110" y="0" width="3.5" height="3.5" rx="0.6" fill="#d97706"/>
      <rect x="114" y="0" width="3.5" height="3.5" rx="0.6" fill="#115e59"/>
      {/* Row 1 */}
      <rect x="50" y="4.5" width="3.5" height="3.5" rx="0.6" fill="#a8c4d8"/>
      <rect x="70" y="4.5" width="3.5" height="3.5" rx="0.6" fill="#1a365d"/>
      <rect x="78" y="4.5" width="3.5" height="3.5" rx="0.6" fill="#a8c4d8"/>
      <rect x="86" y="4.5" width="3.5" height="3.5" rx="0.6" fill="#115e59"/>
      <rect x="90" y="4.5" width="3.5" height="3.5" rx="0.6" fill="#a8c4d8"/>
      <rect x="94" y="4.5" width="3.5" height="3.5" rx="0.6" fill="#1a365d"/>
      <rect x="98" y="4.5" width="3.5" height="3.5" rx="0.6" fill="#d97706"/>
      <rect x="102" y="4.5" width="3.5" height="3.5" rx="0.6" fill="#115e59"/>
      <rect x="106" y="4.5" width="3.5" height="3.5" rx="0.6" fill="#d97706"/>
      <rect x="110" y="4.5" width="3.5" height="3.5" rx="0.6" fill="#1a365d"/>
      <rect x="114" y="4.5" width="3.5" height="3.5" rx="0.6" fill="#a8c4d8"/>
      {/* Row 2 */}
      <rect x="42" y="9" width="3.5" height="3.5" rx="0.6" fill="#a8c4d8"/>
      <rect x="58" y="9" width="3.5" height="3.5" rx="0.6" fill="#1a365d"/>
      <rect x="66" y="9" width="3.5" height="3.5" rx="0.6" fill="#a8c4d8"/>
      <rect x="74" y="9" width="3.5" height="3.5" rx="0.6" fill="#115e59"/>
      <rect x="78" y="9" width="3.5" height="3.5" rx="0.6" fill="#1a365d"/>
      <rect x="82" y="9" width="3.5" height="3.5" rx="0.6" fill="#a8c4d8"/>
      <rect x="86" y="9" width="3.5" height="3.5" rx="0.6" fill="#d97706"/>
      <rect x="90" y="9" width="3.5" height="3.5" rx="0.6" fill="#1a365d"/>
      <rect x="94" y="9" width="3.5" height="3.5" rx="0.6" fill="#115e59"/>
      <rect x="98" y="9" width="3.5" height="3.5" rx="0.6" fill="#a8c4d8"/>
      <rect x="102" y="9" width="3.5" height="3.5" rx="0.6" fill="#d97706"/>
      <rect x="106" y="9" width="3.5" height="3.5" rx="0.6" fill="#1a365d"/>
      <rect x="110" y="9" width="3.5" height="3.5" rx="0.6" fill="#115e59"/>
      <rect x="114" y="9" width="3.5" height="3.5" rx="0.6" fill="#d97706"/>
      {/* Row 3 */}
      <rect x="54" y="13.5" width="3.5" height="3.5" rx="0.6" fill="#a8c4d8"/>
      <rect x="66" y="13.5" width="3.5" height="3.5" rx="0.6" fill="#1a365d"/>
      <rect x="74" y="13.5" width="3.5" height="3.5" rx="0.6" fill="#a8c4d8"/>
      <rect x="82" y="13.5" width="3.5" height="3.5" rx="0.6" fill="#115e59"/>
      <rect x="86" y="13.5" width="3.5" height="3.5" rx="0.6" fill="#1a365d"/>
      <rect x="90" y="13.5" width="3.5" height="3.5" rx="0.6" fill="#d97706"/>
      <rect x="94" y="13.5" width="3.5" height="3.5" rx="0.6" fill="#a8c4d8"/>
      <rect x="98" y="13.5" width="3.5" height="3.5" rx="0.6" fill="#1a365d"/>
      <rect x="102" y="13.5" width="3.5" height="3.5" rx="0.6" fill="#115e59"/>
      <rect x="106" y="13.5" width="3.5" height="3.5" rx="0.6" fill="#d97706"/>
      <rect x="110" y="13.5" width="3.5" height="3.5" rx="0.6" fill="#a8c4d8"/>
      <rect x="114" y="13.5" width="3.5" height="3.5" rx="0.6" fill="#1a365d"/>
      {/* Row 4 */}
      <rect x="38" y="18" width="3.5" height="3.5" rx="0.6" fill="#a8c4d8"/>
      <rect x="62" y="18" width="3.5" height="3.5" rx="0.6" fill="#1a365d"/>
      <rect x="70" y="18" width="3.5" height="3.5" rx="0.6" fill="#115e59"/>
      <rect x="78" y="18" width="3.5" height="3.5" rx="0.6" fill="#a8c4d8"/>
      <rect x="82" y="18" width="3.5" height="3.5" rx="0.6" fill="#1a365d"/>
      <rect x="86" y="18" width="3.5" height="3.5" rx="0.6" fill="#a8c4d8"/>
      <rect x="90" y="18" width="3.5" height="3.5" rx="0.6" fill="#115e59"/>
      <rect x="94" y="18" width="3.5" height="3.5" rx="0.6" fill="#d97706"/>
      <rect x="98" y="18" width="3.5" height="3.5" rx="0.6" fill="#1a365d"/>
      <rect x="102" y="18" width="3.5" height="3.5" rx="0.6" fill="#a8c4d8"/>
      <rect x="106" y="18" width="3.5" height="3.5" rx="0.6" fill="#115e59"/>
      <rect x="110" y="18" width="3.5" height="3.5" rx="0.6" fill="#d97706"/>
      <rect x="114" y="18" width="3.5" height="3.5" rx="0.6" fill="#1a365d"/>
      {/* Row 5 */}
      <rect x="46" y="22.5" width="3.5" height="3.5" rx="0.6" fill="#a8c4d8"/>
      <rect x="58" y="22.5" width="3.5" height="3.5" rx="0.6" fill="#1a365d"/>
      <rect x="74" y="22.5" width="3.5" height="3.5" rx="0.6" fill="#a8c4d8"/>
      <rect x="78" y="22.5" width="3.5" height="3.5" rx="0.6" fill="#115e59"/>
      <rect x="86" y="22.5" width="3.5" height="3.5" rx="0.6" fill="#1a365d"/>
      <rect x="90" y="22.5" width="3.5" height="3.5" rx="0.6" fill="#d97706"/>
      <rect x="94" y="22.5" width="3.5" height="3.5" rx="0.6" fill="#a8c4d8"/>
      <rect x="98" y="22.5" width="3.5" height="3.5" rx="0.6" fill="#115e59"/>
      <rect x="102" y="22.5" width="3.5" height="3.5" rx="0.6" fill="#1a365d"/>
      <rect x="106" y="22.5" width="3.5" height="3.5" rx="0.6" fill="#d97706"/>
      <rect x="110" y="22.5" width="3.5" height="3.5" rx="0.6" fill="#a8c4d8"/>
      <rect x="114" y="22.5" width="3.5" height="3.5" rx="0.6" fill="#115e59"/>
      {/* Row 6 */}
      <rect x="50" y="27" width="3.5" height="3.5" rx="0.6" fill="#1a365d"/>
      <rect x="66" y="27" width="3.5" height="3.5" rx="0.6" fill="#a8c4d8"/>
      <rect x="74" y="27" width="3.5" height="3.5" rx="0.6" fill="#1a365d"/>
      <rect x="82" y="27" width="3.5" height="3.5" rx="0.6" fill="#115e59"/>
      <rect x="86" y="27" width="3.5" height="3.5" rx="0.6" fill="#a8c4d8"/>
      <rect x="90" y="27" width="3.5" height="3.5" rx="0.6" fill="#1a365d"/>
      <rect x="94" y="27" width="3.5" height="3.5" rx="0.6" fill="#d97706"/>
      <rect x="98" y="27" width="3.5" height="3.5" rx="0.6" fill="#a8c4d8"/>
      <rect x="102" y="27" width="3.5" height="3.5" rx="0.6" fill="#115e59"/>
      <rect x="106" y="27" width="3.5" height="3.5" rx="0.6" fill="#1a365d"/>
      <rect x="110" y="27" width="3.5" height="3.5" rx="0.6" fill="#d97706"/>
      <rect x="114" y="27" width="3.5" height="3.5" rx="0.6" fill="#115e59"/>
      {/* Row 7 */}
      <rect x="42" y="31.5" width="3.5" height="3.5" rx="0.6" fill="#a8c4d8"/>
      <rect x="62" y="31.5" width="3.5" height="3.5" rx="0.6" fill="#1a365d"/>
      <rect x="70" y="31.5" width="3.5" height="3.5" rx="0.6" fill="#a8c4d8"/>
      <rect x="78" y="31.5" width="3.5" height="3.5" rx="0.6" fill="#115e59"/>
      <rect x="86" y="31.5" width="3.5" height="3.5" rx="0.6" fill="#1a365d"/>
      <rect x="90" y="31.5" width="3.5" height="3.5" rx="0.6" fill="#a8c4d8"/>
      <rect x="94" y="31.5" width="3.5" height="3.5" rx="0.6" fill="#115e59"/>
      <rect x="98" y="31.5" width="3.5" height="3.5" rx="0.6" fill="#d97706"/>
      <rect x="102" y="31.5" width="3.5" height="3.5" rx="0.6" fill="#1a365d"/>
      <rect x="106" y="31.5" width="3.5" height="3.5" rx="0.6" fill="#a8c4d8"/>
      <rect x="110" y="31.5" width="3.5" height="3.5" rx="0.6" fill="#115e59"/>
      <rect x="114" y="31.5" width="3.5" height="3.5" rx="0.6" fill="#d97706"/>
      {/* Row 8 */}
      <rect x="54" y="36" width="3.5" height="3.5" rx="0.6" fill="#a8c4d8"/>
      <rect x="70" y="36" width="3.5" height="3.5" rx="0.6" fill="#1a365d"/>
      <rect x="78" y="36" width="3.5" height="3.5" rx="0.6" fill="#115e59"/>
      <rect x="82" y="36" width="3.5" height="3.5" rx="0.6" fill="#a8c4d8"/>
      <rect x="90" y="36" width="3.5" height="3.5" rx="0.6" fill="#1a365d"/>
      <rect x="94" y="36" width="3.5" height="3.5" rx="0.6" fill="#d97706"/>
      <rect x="98" y="36" width="3.5" height="3.5" rx="0.6" fill="#115e59"/>
      <rect x="102" y="36" width="3.5" height="3.5" rx="0.6" fill="#a8c4d8"/>
      <rect x="106" y="36" width="3.5" height="3.5" rx="0.6" fill="#1a365d"/>
      <rect x="110" y="36" width="3.5" height="3.5" rx="0.6" fill="#d97706"/>
      <rect x="114" y="36" width="3.5" height="3.5" rx="0.6" fill="#115e59"/>
    </svg>
  );
};

export default MosaicBackground;
