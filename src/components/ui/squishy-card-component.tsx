import { motion } from "framer-motion";

interface SquishyCardProps {
  title?: string;
  price: string;
  duration?: string;
  description?: string;
  badge?: string;
  onClick?: () => void;
}

const SquishyCard = ({ 
  title = "Service",
  price,
  duration = "60 min",
  description = "Professional mobile massage therapy delivered to your location.",
  badge = "Popular",
  onClick
}: SquishyCardProps) => {
  return (
    <motion.div
      whileHover="hover"
      transition={{
        duration: 0.8,
        ease: "backInOut",
      }}
      variants={{
        hover: {
          scale: 1.02,
        },
      }}
      onClick={onClick}
      className="relative h-80 w-full max-w-sm shrink-0 overflow-hidden rounded-xl bg-charcoal border border-champagne/20 p-6 cursor-pointer group"
    >
      <div className="relative z-10 text-ivory">
        <span className="mb-3 block w-fit rounded-full bg-champagne/20 px-3 py-1 text-xs font-body tracking-tracked uppercase text-champagne">
          {badge}
        </span>
        
        <motion.span
          initial={{ scale: 0.95 }}
          variants={{
            hover: {
              scale: 1,
            },
          }}
          transition={{
            duration: 0.8,
            ease: "backInOut",
          }}
          className="my-2 block origin-top-left font-display text-5xl font-medium leading-[1] text-ivory"
        >
          {price}
          <span className="text-lg text-cream/60 font-heading font-light">/{duration}</span>
        </motion.span>
        
        <h3 className="font-heading text-xl text-champagne mb-2">{title}</h3>
        
        <p className="font-body text-sm text-cream/70 leading-relaxed">
          {description}
        </p>
      </div>
      
      <button className="absolute bottom-6 left-6 right-6 z-20 rounded border border-champagne/50 bg-transparent py-3 text-center font-body text-xs tracking-tracked uppercase text-champagne backdrop-blur transition-all duration-300 hover:bg-champagne hover:text-onyx">
        Book Now
      </button>
      
      <Background />
    </motion.div>
  );
};

const Background = () => {
  return (
    <motion.svg
      width="100%"
      height="100%"
      viewBox="0 0 320 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 z-0 opacity-20"
      preserveAspectRatio="xMidYMid slice"
      variants={{
        hover: {
          scale: 1.3,
        },
      }}
      transition={{
        duration: 0.8,
        ease: "backInOut",
      }}
    >
      <motion.circle
        variants={{
          hover: {
            scaleY: 0.5,
            y: -25,
          },
        }}
        transition={{
          duration: 0.8,
          ease: "backInOut",
          delay: 0.15,
        }}
        cx="160"
        cy="100"
        r="80"
        fill="#c9a961"
      />
      <motion.ellipse
        variants={{
          hover: {
            scaleY: 2.25,
            y: -25,
          },
        }}
        transition={{
          duration: 0.8,
          ease: "backInOut",
          delay: 0.15,
        }}
        cx="160"
        cy="220"
        rx="80"
        ry="35"
        fill="#c9a961"
      />
    </motion.svg>
  );
};

export default SquishyCard;
