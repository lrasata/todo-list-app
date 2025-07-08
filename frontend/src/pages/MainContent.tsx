import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "../components/Dialog.tsx";
import CreateOrUpdateCategoryContainer from "../containers/CreateOrUpdateCategoryContainer.tsx";
import { dialogActions } from "../redux-store/dialog-slice.ts";
import { useCookies } from "react-cookie";
import MainNavigationContainer from "../containers/MainNavigationContainer.tsx";

const MainContent = () => {
  const dispatch = useDispatch();
  // @ts-ignore
  const isOpenSelector = useSelector((state) => state.dialog.isOpen);
  // @ts-ignore
  const dialogTitleSelector = useSelector((state) => state.dialog.title);
  // @ts-ignore
  const dialogCategorySelector = useSelector((state) => state.dialog.category);
  const [cookies] = useCookies(["token"]);

  const handleCloseDialog = () => {
    dispatch(dialogActions.close());
  };

  return (
    <>
      {cookies.token && <MainNavigationContainer />}

      <Outlet />
      <Dialog
        open={isOpenSelector}
        onClose={handleCloseDialog}
        title={dialogTitleSelector}
        content={
          <CreateOrUpdateCategoryContainer
            closeDialog={handleCloseDialog}
            {...(dialogCategorySelector && {
              _id: dialogCategorySelector._id,
              name: dialogCategorySelector.name,
              colour: dialogCategorySelector.colour,
            })}
          />
        }
      />
    </>
  );
};

export default MainContent;
