import Icon from '@/components/ui/icon';

interface RatingDisplayProps {
  rating: number;
  reviewCount: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function RatingDisplay({ rating, reviewCount, size = 'md' }: RatingDisplayProps) {
  const starSize = size === 'sm' ? 16 : size === 'lg' ? 24 : 20;
  const textSize = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-xl' : 'text-base';
  
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <Icon
            key={i}
            name="Star"
            size={starSize}
            className="fill-yellow-400 text-yellow-400"
          />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <div key={i} className="relative" style={{ width: starSize, height: starSize }}>
            <Icon
              name="Star"
              size={starSize}
              className="absolute text-gray-300"
            />
            <div className="absolute overflow-hidden" style={{ width: `${starSize / 2}px` }}>
              <Icon
                name="Star"
                size={starSize}
                className="fill-yellow-400 text-yellow-400"
              />
            </div>
          </div>
        );
      } else {
        stars.push(
          <Icon
            key={i}
            name="Star"
            size={starSize}
            className="text-gray-300"
          />
        );
      }
    }
    
    return stars;
  };

  if (reviewCount === 0) {
    return (
      <div className={`flex items-center gap-2 ${textSize}`}>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <Icon key={i} name="Star" size={starSize} className="text-gray-300" />
          ))}
        </div>
        <span className="text-muted-foreground">Нет отзывов</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${textSize}`}>
      <div className="flex gap-1">
        {renderStars()}
      </div>
      <span className="font-semibold">{rating.toFixed(1)}</span>
      <span className="text-muted-foreground">({reviewCount})</span>
    </div>
  );
}
