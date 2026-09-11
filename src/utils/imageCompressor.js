/**
 * High-performance client-side image compression & optimization.
 * Resizes large smartphone/camera packaging photos down to optimal dimensions (max 1280px)
 * and applies lightweight JPEG compression (0.85 quality) to ensure fast uploads (<200ms)
 * while preserving crystal-clear label text legibility for Gemini Vision.
 */

export async function compressImageForVision(fileOrDataUrl, maxWidth = 1280, maxHeight = 1280, quality = 0.85) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      let { width, height } = img;

      // Calculate constrained aspect ratio
      if (width > maxWidth || height > maxHeight) {
        if (width / height > maxWidth / maxHeight) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        } else {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      // Render to offscreen canvas
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        // Fallback to original if canvas context unavailable
        resolve(typeof fileOrDataUrl === 'string' ? fileOrDataUrl : img.src);
        return;
      }

      // Smooth bicubic resampling
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);

      // Convert to compressed JPEG data URL
      const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
      console.log(`🖼️ Image optimized for Gemini Vision: ${img.naturalWidth}x${img.naturalHeight} -> ${width}x${height} (${Math.round(compressedDataUrl.length / 1024)} KB base64)`);
      resolve(compressedDataUrl);
    };

    img.onerror = (err) => {
      console.warn('Image compression error, using raw source:', err);
      resolve(typeof fileOrDataUrl === 'string' ? fileOrDataUrl : '');
    };

    if (typeof fileOrDataUrl === 'string') {
      img.src = fileOrDataUrl;
    } else if (fileOrDataUrl instanceof Blob || fileOrDataUrl instanceof File) {
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(fileOrDataUrl);
    } else {
      resolve('');
    }
  });
}
