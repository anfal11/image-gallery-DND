import {
  createBrowserRouter,
} from "react-router-dom";
import ImageGallery from "../Components/ImageGallery";

const router = createBrowserRouter([
    {
      path: "/",
      element: <ImageGallery />,
    },
  ]);
export default router;