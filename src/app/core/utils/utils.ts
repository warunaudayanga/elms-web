export const getRandomColor = ((): (() => string) => {
    const usedColors = new Set();
    const colors = [
        "#E53935", // red
        "#B71C1C",
        "#E91E63", // pink
        "#880E4F",
        "#9C27B0", // purple
        "#4A148C",
        "#673AB7", // deep purple
        "#3F51B5", // indigo
        "#283593",
        "#1A237E",
        "#2196F3", // blue
        "#01579B",
        "#00BCD4", // cyan
        "#006064",
        "#009688", // teal
        "#004D40",
        "#4CAF50", // green
        "#1B5E20",
        "#8BC34A", // light green
        "#FFEB3B", // yellow
        "#FF6F00",
        "#BF360C",
    ];
    const maxColors = colors.length;
    let currentIndex = Math.floor(Math.random() * maxColors);

    return (): string => {
        const prevIndex = currentIndex;
        let index;
        do {
            index = Math.floor(Math.random() * maxColors);
        } while (Math.abs(index - prevIndex) <= 1 || Math.abs(index - prevIndex) >= maxColors - 1 || usedColors.has(colors[index]));
        const color = colors[index];
        usedColors.add(color);
        currentIndex = index;
        if (usedColors.size === maxColors) {
            usedColors.clear();
        }
        return color;
    };
})();
