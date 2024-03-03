export const fadeIn = (direction: string, delay: number) => {
    return {
      hidden: {
        y: direction === "up" ? 10 : direction === "down" ? -10 : 0,
        opacity: 0,
        x: direction === "left" ? 10 : direction === "right" ? -10 : 0,
      },
      show: {
        y: 0,
        x: 0,
        opacity: 1,
        transition: {
          type: "tween",
          duration: .3,
          delay: delay,
        },
      },
    };
  };
  