import { useTheme } from '../../hooks/useTheme';
import { PixelBlast } from './pixel-blast';

const PIXEL_THEME = {
  dark: {
    color: '#343957',
    accentColor: '#7c8dcc',
    lightMode: false,
    patternDensity: 0.78,
    glow: 0.22,
  },
  light: {
    color: '#c4c9e8',
    accentColor: '#6673c4',
    lightMode: true,
    patternDensity: 0.68,
    glow: 0.14,
  },
} as const;

export function HeroBackground() {
  const { theme } = useTheme();
  const t = PIXEL_THEME[theme];

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
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
        edgeFade={0.3}
        variation={7}
      />
    </div>
  );
}
