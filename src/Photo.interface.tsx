interface Photo {
    id: string;
    alt_description: string;
    urls: {
        regular: string;
    };
    views: number;
    downloads: number;
    likes: number;
}

export default Photo;