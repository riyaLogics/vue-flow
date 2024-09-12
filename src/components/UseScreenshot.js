// useScreenshot.js or useScreenshot.ts
import html2canvas from 'html2canvas'; // This library captures DOM elements as images

export function useScreenshot() {
  const capture = async (element, options) => {
    try {
      const canvas = await html2canvas(element, options);
      const dataUrl = canvas.toDataURL('image/png');

      if (options.shouldDownload) {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'screenshot.png';
        link.click();
      }

      return dataUrl;
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    }
  };

  return { capture };
}
