let getUncheckedImage = title => [%bs.raw
  {|
   require("../images/"+title.toLowerCase()+"/grey.svg")
   |}
];
let getCheckedImage = title => [%bs.raw
  {|
    require("../images/"+title.toLowerCase()+"/blue.svg")
    |}
];
let s = ReasonReact.string;

let component = ReasonReact.statelessComponent(__MODULE__);

let make = (~value, ~handleClickItem, ~checked, ~title, ~desc, _) => {
  ...component,
  render: _self =>
    <div className="abuse-div" onClick={_e => handleClickItem(value)}>
      <div className="abuse-div-img">
        <img
          className="img-item"
          src={checked ? getCheckedImage(title) : getUncheckedImage(title)}
          alt=""
        />
      </div>
      <div className="label-title-div">
        <div className="title-label"> {s(title)} </div>
      </div>
      <div className="label-description-div">
        <div className="content-label"> {s(desc)} </div>
      </div>
    </div>,
};

[@bs.deriving abstract]
type jsProps = {
  value: int,
  handleClickItem: int => unit,
  checked: bool,
  title: string,
  desc: string,
};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(
      ~value=jsProps->valueGet,
      ~handleClickItem=jsProps->handleClickItemGet,
      ~checked=jsProps->checkedGet,
      ~title=jsProps->titleGet,
      ~desc=jsProps->descGet,
      [||],
    )
  );
