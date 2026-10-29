import type { ImageMetadata } from "astro";

export const site = {
    name: "JD Gallery",
    owner: "Dan",
    description:
        "Photography and media production by Dan: sports, weddings, events, real estate and aerial.",
    email: "jdgalleryy@gmail.com",
    instagram: {
        handle: "@_jdgallery",
        url: "https://www.instagram.com/_jdgallery/",
    },
};

export const navItems = [
    { label: "Work", href: "/#work" },
    { label: "Services", href: "/#services" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
];

// Each folder in src/assets/work/ is one gallery. To add a gallery, add a
// folder of photos and an entry here; `cover` is a filename from that folder.
const galleryInfo = [
    {
        slug: "real-estate",
        title: "Real Estate",
        description:
            "Interiors, exteriors and the details that sell a home, shot in clean, natural light.",
        cover: "38.jpg",
    },
    {
        slug: "ride-with-tide",
        title: "Ride with Tide",
        description: "Surf, shoreline and sunset sessions on the beach.",
        cover: "DSC08104.jpg",
    },
];

const files = import.meta.glob<{ default: ImageMetadata }>(
    "/src/assets/work/*/*.{jpg,jpeg,png,webp}",
    { eager: true },
);

export type Photo = { name: string; src: ImageMetadata };

export const galleries = galleryInfo.map((info) => {
    const photos: Photo[] = Object.entries(files)
        .filter(([path]) => path.includes(`/work/${info.slug}/`))
        .map(([path, mod]) => ({
            name: path.split("/").pop()!,
            src: mod.default,
        }))
        .sort((a, b) =>
            a.name.localeCompare(b.name, undefined, { numeric: true }),
        );
    const cover = photos.find((p) => p.name === info.cover) ?? photos[0];
    return { ...info, photos, cover };
});

export type Gallery = (typeof galleries)[number];
