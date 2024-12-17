"use client";

import LightGallery from "lightgallery/react";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

import Image from "next/image";
import Link from "next/link";

interface IProps {
  images: string[];
}

export default function ImageGallery({ images }: IProps) {
  return (
    <LightGallery
      elementClassNames={` mt-2 gap-1 grid place-items-center
       ${
         images?.length === 1 || images?.length === 2
           ? "grid-cols-1"
           : "grid-cols-2"
       } `}
      speed={500}
      plugins={[lgThumbnail, lgZoom]}
    >
      {images?.map((image, index) => (
        <Link
          className={`w-full ${
            images.length === 3 && index === 0 ? "col-span-2" : "col-span-1"
          }`}
          key={index}
          href={image}
        >
          <Image
            className={`${
              images?.length === 1
                ? "h-[300px] md:h-[600px]"
                : images?.length === 2
                ? "max-h-[150px] md:max-h-[300px]"
                : "h-[150px] md:h-[300px]"
            } w-full object-cover`}
            src={image}
            height={500}
            width={500}
            alt={`image-${index}`}
          />
        </Link>
      ))}
    </LightGallery>
  );
}
