import React, { useState } from "react";
import {
  Tabs as BlueprintTabs,
  Tab,
  Navbar,
  Alignment,
  IconName,
  Button,
  ControlGroup,
  Tag
} from "@blueprintjs/core";
import EditorWindow from "../LayoutComponents/Editor/EditorWindow";
import "./tabs.scss";

interface Props {
  id?: string;
  tabs: {
    id: string;
    title: string;
    childerns: React.ReactNode;
    heading: string;
  }[];
  currentTabId: React.ReactText;
  betweenComponent?: React.ReactNode;
}
const Tabs = (props: Props) => {
  const [currentTabId, setCurrentTabId] = useState(props.currentTabId);
  return (
    <div>
      <Navbar style={{ height: 45 }}>
        <Navbar.Group>
          <Navbar.Heading>
            {props.tabs.find(tab => currentTabId === tab.id).heading}
          </Navbar.Heading>
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <BlueprintTabs
            animate
            large
            selectedTabId={currentTabId}
            onChange={newTab => setCurrentTabId(newTab)}
            id={props.id}
          >
            {props.tabs.map(tab => (
              <Tab id={tab.id} title={tab.title} />
            ))}
          </BlueprintTabs>
        </Navbar.Group>
      </Navbar>
      {props.betweenComponent}
      {props.tabs.find(tab => currentTabId === tab.id).childerns}
    </div>
  );
};
interface ControlGroupProps {
  id?: string;
  tabs: {
    id: string;
    title: string;
    childerns: React.ReactNode;
    heading: string;
  }[];
  currentTabId: React.ReactText;
  betweenComponent?: React.ReactNode;
}
export const ControlGroupTabs = (props: ControlGroupProps) => {
  const [currentTabId, setCurrentTabId] = useState(props.currentTabId);
  return (
    <div style={{ margin: 25 }}>
      <ControlGroup fill style={{ width: "100%", height: 38 }}>
        <Tag>
          <h3>{props.tabs.find(tab => currentTabId === tab.id).heading}</h3>
        </Tag>
        <Tag style={{ backgroundColor: "#394b59" }}>
          <BlueprintTabs
            animate
            large
            selectedTabId={currentTabId}
            onChange={newTab => setCurrentTabId(newTab)}
            id={props.id}
          >
            {props.tabs.map(tab => (
              <Tab id={tab.id} title={tab.title} />
            ))}
          </BlueprintTabs>
        </Tag>
      </ControlGroup>
      {props.betweenComponent}
      {props.tabs.find(tab => currentTabId === tab.id).childerns}
    </div>
  );
};

interface IconsTabsProps {
  tabs: {
    id: string;
    icon: IconName;
    childerns: React.ReactNode;
    heading: string;
  }[];
  currentTabId: React.ReactText;
  betweenComponent?: React.ReactNode;
}

export const IconsTabs = (props: IconsTabsProps) => {
  const [currentTabId, setCurrentTabId] = useState(props.currentTabId);
  return (
    <div>
      <Navbar style={{ height: 45 }}>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>
            {props.tabs.find(tab => currentTabId === tab.id).heading}
          </Navbar.Heading>
        </Navbar.Group>
        <Navbar.Group align={Alignment.CENTER}>
          {props.tabs.map(tab => (
            <Button
              icon={tab.icon}
              minimal
              onClick={() => setCurrentTabId(tab.id)}
            />
          ))}
        </Navbar.Group>
      </Navbar>
      {props.betweenComponent}
      {props.tabs.find(tab => currentTabId === tab.id).childerns}
    </div>
  );
};

export interface EditorTabs {
  id: string;
  filename: string;
}

interface FilesTabsProps {
  tabs: EditorTabs[];
  onCloseTab: (id: string) => void;
  setActiveTab: (id: string) => void;
  currentTabId: React.ReactText;
  betweenComponent?: React.ReactNode;
}

function useForceUpdate() {
  const [, setValue] = useState(0); // integer state
  return () => setValue(value => ++value); // update the state to force render
}

export const FilesTabs = (props: FilesTabsProps) => {
  const forceUpdate = useForceUpdate();
  return (
    <div>
      <Navbar style={{ height: 45 }}>
        <Navbar.Group
          align={Alignment.CENTER}
          style={{ overflowX: "auto", overflowY: "hidden" }}
        >
          <BlueprintTabs selectedTabId={props.currentTabId}>
            {props.tabs.map(tab => (
              <Tab
                style={{
                  minWidth: 150,
                  maxWidth: 250,
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                }}
                id={tab.id}
                title={
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      height: 40
                    }}
                  >
                    <Button
                      minimal
                      icon={"cross"}
                      style={{}}
                      onClick={() => {
                        props.onCloseTab(tab.id);
                        forceUpdate();
                      }}
                    />
                    <div
                      style={{ marginTop: 3, fontSize: 15 }}
                      onClick={() => props.setActiveTab(tab.id)}
                    >
                      {tab.filename}
                    </div>
                  </div>
                }
              />
            ))}
          </BlueprintTabs>
        </Navbar.Group>
      </Navbar>
      {props.betweenComponent}
      <EditorWindow
        key={props.tabs.find(tab => props.currentTabId === tab.id).id}
        document={
          props.tabs.find(tab => props.currentTabId === tab.id).filename
        }
        editor="Monaco"
      />
    </div>
  );
};

export default Tabs;
