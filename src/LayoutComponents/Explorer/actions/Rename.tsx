import React, { Component } from "react";
import StorageManager from "../../../Storage/storageManager";
import {
  Dialog,
  InputGroup,
  Card,
  Elevation,
  H6,
  Divider
} from "@blueprintjs/core";

interface RenameFileState {
  isOpen: boolean;
  selected: string;
  selectedIsDirectory: boolean;
}
interface RenameFileProps {
  selectedIsDirectory: boolean;
  isOpen: boolean;
  selected: string;
  onClose: (success: boolean, newName?: string) => void;
}

class RenameFile extends Component<RenameFileProps, RenameFileState> {
  storage: StorageManager;
  originalSelected: string;
  constructor(props: RenameFileProps) {
    super(props);
    this.storage = new StorageManager();
    this.state = {
      isOpen: props.isOpen,
      selected: props.selected,
      selectedIsDirectory: props.selectedIsDirectory
    };
    this.originalSelected = this.state.selected;
  }
  Rename = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      const selected = this.state.selected;
      if (
        selected &&
        selected !== this.originalSelected &&
        selected !== this.props.selected
      ) {
        this.storage
          .renameDocument(this.originalSelected, selected)
          .then(() => {
            this.props.onClose(true, selected);
          });
      }
    }
  };
  render() {
    return (
      <Dialog
        className={"bp3-dark"}
        onClose={() => this.props.onClose(false)}
        isOpen={this.state.isOpen}
        icon="text-highlight"
        title="rename file"
      >
        <InputGroup
          onKeyDown={this.Rename}
          autoFocus
          large
          intent="primary"
          defaultValue={this.state.selected}
          placeholder="enter new name"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            this.setState({ selected: e.target.value });
          }}
        />
        <Divider />
        <Card elevation={Elevation.ZERO}>
          <H6>click enter to rename or escape to cancel</H6>
        </Card>
      </Dialog>
    );
  }
}

export default RenameFile;
