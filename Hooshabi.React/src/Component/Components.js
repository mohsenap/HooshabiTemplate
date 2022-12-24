import FormDefaultComponent from "./Form/Default/FormDefaultComponent";
import GridDefaultComponent from "./Grid/Default/GridDefaultComponent";
import Component1DefaultComponent from "./Component1/Default/Component1DefaultComponent";
import FileUploaderDefaultComponent from "./FileUploader/Default/FileUploaderDefaultComponent";
import TransferDefaultComponent from "./Transfer/Default/TransferDefaultComponent";
import TreeLookupDefaultComponent from "./TreeLookup/Default/TreeLookupDefaultComponent";
import Component99DefaultComponent from "./CustomModal/Default/CustomModalDefaultComponent";
import CustomEditorDefaultComponent from "./CustomEditor/Default/CustomEditorDefaultComponent";
//References//

const Components = [
  { Name: "Grid", Type: "Default", Component: GridDefaultComponent },
  { Name: "Form", Type: "Default", Component: FormDefaultComponent },
  {
    Name: "FileUploaderDefaultComponent",
    Type: "Default",
    Component: FileUploaderDefaultComponent,
  },
  {
    Name: "Component1DefaultComponent",
    Type: "Default",
    Component: Component1DefaultComponent,
  },
  {
    Name: "Component2",
    Type: "Default",
    Component: TransferDefaultComponent,
  },
  {
    Name: "TreeLookup",
    Type: "Default",
    Component: TreeLookupDefaultComponent,
  },
  {
    Name: "Component99",
    Type: "Default",
    Component: Component99DefaultComponent,
  },
  {
    Name: "CustomEditorDefaultComponent",
    Type: "Default",
    Component: CustomEditorDefaultComponent,
  },
  //Components//
];

export default Components;
