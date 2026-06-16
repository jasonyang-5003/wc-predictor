import { toPng } from 'html-to-image';

export async function exportToPng(element: HTMLElement): Promise<Blob | null> {
  try {
    const dataUrl = await toPng(element, {
      quality: 1,
      pixelRatio: 1,
      cacheBust: true,
      width: 1080,
      height: 1920,
      style: {
        transform: 'scale(1)',
        transformOrigin: 'top left',
      },
    });

    const response = await fetch(dataUrl);
    return response.blob();
  } catch (error) {
    console.error('Failed to export image:', error);
    return null;
  }
}

export function downloadBlob(blob: Blob, filename: string = 'wc2026-prediction-story.png') {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function sharePoster(blob: Blob, title: string = '2026 世界杯冠军预测', text: string = '来看我的 2026 世界杯冠军和亚军预测。'): Promise<boolean> {
  if (!navigator.share || !navigator.canShare) {
    return false;
  }

  const file = new File([blob], 'wc2026-prediction-story.png', { type: 'image/png' });
  const shareData = {
    title,
    text,
    files: [file],
  };

  if (!navigator.canShare(shareData)) {
    return false;
  }

  try {
    await navigator.share(shareData);
    return true;
  } catch (error) {
    if ((error as Error).name === 'AbortError') {
      return true;
    }
    if ((error as Error).name === 'NotAllowedError') {
      return false;
    }
    console.error('Share failed:', error);
    return false;
  }
}
