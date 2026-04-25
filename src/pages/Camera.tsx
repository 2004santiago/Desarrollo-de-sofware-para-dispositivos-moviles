import PageLayout from "../components/PageLayout";
import { useCamera } from "../hooks/useCamera";
import { AppButton } from "../components/ui";

function CameraPage() {
  const { photo, takePhoto } = useCamera();

  return (
    <PageLayout title="Camera">
      <div className="space-y-4">
        <AppButton onClick={takePhoto}>Tomar foto</AppButton>

        {photo && (
          <img
            src={photo}
            alt="foto"
            className="w-full rounded-2xl border border-white/10 object-cover shadow-lg"
          />
        )}
      </div>
    </PageLayout>
  );
}

export default CameraPage;
