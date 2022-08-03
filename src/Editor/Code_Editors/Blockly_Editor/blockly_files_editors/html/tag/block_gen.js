import { UniversalBlockMaker } from "../../../blockMaker";

const makeBlock = block => {
  const type = block.name;
  const name = block.displayName || block.name;
  const color = 100;
  const tooltip = block.description;
  const helpURL = block.helpURL || "";
  const haveMetadata = block.hasOwnProperty("metadata");
  const noPerent = block.metadata.noPerent || false;
  const noBody = block.metadata.noBody || false;

  let args = [
    {
      type: "input_dummy"
    }
  ];
  if (!haveMetadata || !block.metadata.noAttributes) {
    args.push({ type: "input_value", name: "attribute_input" });
  }
  if (haveMetadata || !noBody) {
    args.push({ type: "input_statement", name: "tag_body_input" });
  }
  return UniversalBlockMaker(
    type,
    name,
    args,
    color,
    tooltip,
    helpURL,
    true,
    !noPerent,
    haveMetadata ? block.metadata : {},
    block.hasOwnProperty("tags") ? block.tags[0] : "default"
  );
};
export default makeBlock;
