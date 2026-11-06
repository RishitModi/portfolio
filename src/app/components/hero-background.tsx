import { useTheme } from '../../hooks/useTheme';
import { PixelBlast } from './pixel-blast';

const PIXEL_THEME = {
  dark: {
    color: '#4b5385',
    accentColor: '#a9b8ff',
    lightMode: false,
    patternDensity: 1,
    glow: 0.4,
  },
  light: {
    color: '#a3acdf',
    accentColor: '#3f51d6',
    lightMode: true,
    patternDensity: 0.85,
    glow: 0.25,
  },
} as const;

export function HeroBackground() {
  const { theme } = useTheme();
  const t = PIXEL_THEME[theme];

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
      <PixelBlast
        variant="square"
        pixelSize={3}
        color={t.color}
        accentColor={t.accentColor}
        lightMode={t.lightMode}
        patternScale={2}
        patternDensity={t.patternDensity}
        softness={0.6}
        glow={t.glow}
        twinkle={0.25}
        drift={0.2}
        hoverEffect="reveal"
        enableRipples
        edgeFade={0.35}
        variation={7}
      />
    </div>
  );
}
