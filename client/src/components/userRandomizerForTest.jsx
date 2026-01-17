const userRandomizerForTest = import.meta.glob("../assets/placeholderImages/*.{png,jpg,jpeg,webp}", {
    eager: true,
    import: "default",
});

export const avatarUrls = Object.values(userRandomizerForTest);