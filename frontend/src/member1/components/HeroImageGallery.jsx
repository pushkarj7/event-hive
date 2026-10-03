function HeroImageGallery({images}){
    return(
        <div className="w-full">
        {/* main image */}
        <div className="relative overflow-hidden rounded-2xl bg-background">
            <img
             src={images[0]}
             alt="Event"
             className="aspect-4/3 w-full object-cover" />
             {/* previous button */}
             <button
             type="button" 
             className="absolute left-4 top1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-text shadow-md transition hover:bg-white"
             aria-label="Previous image"
             >
              ←
             </button>
              {/* next button */}
              <button
              type="button"
              aria-label="next image"
              className="absolute right-4 top1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-text shadow-md transition hover:bg-white">
              →
              </button>
        </div>
        {/* thumbnails */}
        <div className="mt-4 flex gap-3 overflow-x-auto">
            {images.map((image,index)=>(
                <button
                key={image}
                type="button"
                className={`shrink-0 overflow-hidden rounded-lg border-2 ${
                    index===0
                    ? "border-primary"
                    : "border-transparent"
                }}`}
                >
                    <img 
                    src={image}
                     alt={`Event thumbnail ${index + 1}`}
                     className="h-20 w-24 object-cover" />

                </button>
            ))}

        </div>
        </div>

    );
}
export default HeroImageGallery;