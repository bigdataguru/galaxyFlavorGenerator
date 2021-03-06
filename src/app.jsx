'use strict';
var Tabs = ReactSimpleTabs;
var sheds = [
  {
    name: 'Main ToolShed',
    shortName: 'main',
    uri: 'https://toolshed.g2.bx.psu.edu/',
    url: 'https://toolshed.g2.bx.psu.edu/api/repositories?q='
  }
//        {
//            name: 'Test ToolShed',
//            shortName: 'test',
//            uri: 'https://testtoolshed.g2.bx.psu.edu/',
//            url: 'https://testtoolshed.g2.bx.psu.edu/api/repositories?q='
//        }
];
var BioJs = React.createClass({
  render: function () {
    var className = this.props.biojs.length > 0 ? 'border' : '';
    return (
      <div className="border">
        <ul className={className}>

          {this.props.biojs.map(function (item, i) {
            var zebra = isEvenNumber(i) ? '' : 'zebra';
            /*var thisclick =*/ this.props.addToAdded.bind(null, item);
            var toolTipText = item.key[2];
            if (item.added) {
              return (
              <li className={zebra} data-tooltip={toolTipText} key={'liz'+i}>
                <span key={'spanner'+i}>{item.key[1]}</span>

                <div className="button-block" key={'blockey'+i}>
                                                <span key={'spn'+i} className="button thin right disabled">Added
                                                </span>
                </div>
              </li>
                );
              } else {
              var biojslink = "http://biojs.io/d/" + item.key[1];
              var repoButton = <a href={biojslink} target="_blank"
                                  className="button primary thin right" key={'repob'+i}>biojs.io</a>;
              return (
              <li className={zebra} data-tooltip={toolTipText} key={'tt'+i}>
                <span key={'ik'+i}>{item.key[1]}</span>

                <div className="button-block" key={'bb'+i}>
                  <button key={'suc'+i} className="success thin right"
                          onClick={this.props.addToAdded.bind(null, item)}>
                    Add
                  </button>
                  {repoButton}
                </div>
              </li>
                );
              }
            }, this)
            }

        </ul>
      </div>

    )
  }
});

var Vislist = React.createClass({
  render: function () {
    var className = this.props.biojslist.length > 0 ? 'border' : '';
    var self = this;
    return (
      <ul className={className}>{this.props.biojslist.map(function (item, i) {
        var zebra = isEvenNumber(i) ? '' : 'zebra';
        return (
        <li className={zebra} key={'zeb'+i}>
          <span key={'span'+i}>{item.key[1]}</span>

          <div className="button-block" key={'bb'+i}>
            <button className="error thin right"
                    onClick={self.props.removeFromAdded.bind(null, item)} key={'e'+i}>Remove
            </button>
            <div className="shed-badge" key={'shed'+i}>{item.key[1]}</div>
          </div>
        </li>
          )
        })}
      </ul>
    )
  }
});

var RepositoriesFound = React.createClass({
  render: function () {
    var className = this.props.found.length > 0 ? 'border' : '';
    var self = this;
    return (
      <ul className={className}>
        {this.props.found.map(function (item, i) {
          var zebra = isEvenNumber(i) ? '' : 'zebra';
          var toolTipText = item.description;
          var repoButton = '';
          if (item.added) {
            return (
            <li className={zebra} data-tooltip={toolTipText} key={'a'+i}>
              <span key="span-{i}">{item.name}</span>

              <div className="button-block" key={'b'+i}>
                                                <span className="button thin right disabled" key={'c'+i}>Added
                                                </span>
              </div>
            </li>
              );
            } else {
            if (item.remote_repository_url && item.remote_repository_url.length > 0) {
              repoButton = <a href={item.remote_repository_url} target="_blank"
                              className="button primary thin right" key={'d'+i}>Source Code
              </a>
              }
            return (
            <li className={zebra} data-tooltip={toolTipText} key={'e'+i}>
              <span key={'f'+i}>{item.name}</span>

              <div className="button-block" key={'g'+i}>
                <button className=" success thin right"
                        onClick={this.props.addToAdded.bind(null, item)} key={'h'+i}>
                  Add
                </button>
                {repoButton}
              </div>
            </li>
              );
            }
          }, this)}
      </ul>
    );
  }
});

var SearchInput = React.createClass({
  render: function () {
    var options = [];
    for (var i = 0; i < sheds.length; i++) {
      options.push(<option value={i} key={'opt'+i}>{sheds[i].name}</option>)
    }

    return (
      <div className="row squish">
        <div className="col8">
          <input type="text" key="searchBox" onChange={this.props.onSearchChange} min="3"/>
        </div>
        <div className="col4">
          <select onChange={this.props.changeShed}>
            {options}
          </select>
        </div>
      </div>
    )
  }
});

var Loading = React.createClass({
  render: function () {
    var spinnerClass = this.props.loading ? 'sk-fading-circle' : '';
    return (
      <div className={spinnerClass}>
        <div className="sk-circle1 sk-circle"></div>
        <div className="sk-circle2 sk-circle"></div>
        <div className="sk-circle3 sk-circle"></div>
        <div className="sk-circle4 sk-circle"></div>
        <div className="sk-circle5 sk-circle"></div>
        <div className="sk-circle6 sk-circle"></div>
        <div className="sk-circle7 sk-circle"></div>
        <div className="sk-circle8 sk-circle"></div>
        <div className="sk-circle9 sk-circle"></div>
        <div className="sk-circle10 sk-circle"></div>
        <div className="sk-circle11 sk-circle"></div>
        <div className="sk-circle12 sk-circle"></div>
      </div>
    )
  }
});

var RepositoriessList = React.createClass({
  render: function () {
    var className = this.props.added.length > 0 ? 'border' : '';
    var self = this;
    return (
      <ul className={className}>{this.props.added.map(function (item, i) {
        var zebra = isEvenNumber(i) ? '' : 'zebra';
        return (
        <li className={zebra} key={'li'+i}>
          <span key={'sp'+i}>{item.name}</span>

          <div className="button-block" key={'dv'+i}>
            <button className="error thin right"
                    onClick={self.props.removeFromAdded.bind(null, item)} key={'btn'+i}>Remove
            </button>
            <div className="shed-badge" key={'badge'+i}>{item.shed.shortName}</div>
          </div>
        </li>
          )
        })}
      </ul>
    )
  }
});
var FlavorApp = React.createClass({
  getInitialState: function () {
    return {
      added: [],
      found: [],
      biojslist: [],
      loading: false,
      searchText: '',
      shed: sheds[0],
      searchCount: 0,
      GALAXY_CONFIG_BRAND: 'Galaxy',
      images: [],
      biojs: [],
      baseimage: 'bgruening/galaxy-stable'
    };
  },
  loadImages: function () {
    var tempURL = 'http://github-raw-cors-proxy.herokuapp.com/galaxyFlavorsGenerators/galaxyFlavorGenerator/blob/master/resources/flavors.json';
    //var correctURL = 'resources/flavors.json';
    $.ajax({
      url: tempURL,
      dataType: 'json',
      success: function (data) {
        this.setState({images: data});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  loadBiojs: function () {
    // TODO: on deployment server cronjob => curl --globoff 'https://registry.npmjs.org/-/_view/byKeyword?startkey=["galaxy-vis"]&endkey=["galaxy-vis",{}]&group_level=3' inside resources/biojs.json
    var tempURL = 'http://github-raw-cors-proxy.herokuapp.com/galaxyFlavorsGenerators/galaxyFlavorGenerator/blob/master/resources/biojs.json';
    //var correctURL = 'resources/biojs.json';
    $.ajax({
      url: tempURL,
      dataType: 'json',
      success: function (data) {
        this.setState({biojs: data});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function () {
    this.loadImages();
    this.loadBiojs();
  },
  imageChange: function (newValue) {
    console.log('State changed to ' + newValue.target.value);
    this.setState({
      baseimage: newValue.target.value || null
    });
  },
  onSearchChange: function (e) {
    this.setState({searchText: e.target.value});
    doASearch(this);
  },
  addToAdded: function (a) {
    var exists = this.state.added.filter(function (aa) {
        return aa.repo_owner_username === a.repo_owner_username && aa.name === a.name;
      }).length > 0;
    if (!exists) {
      var newAdded = this.state.added.concat([a]);
      var self = this;
      var newFound = [];
      this.state.found.map(function (f) {

        if (f.repo_owner_username === a.repo_owner_username && f.name === a.name) {
          f.added = true;
        }
        f.shed = self.state.shed;
        newFound.push(f);
      });
      this.setState({added: newAdded, found: newFound});

    }
  },
  addToVis: function (a) {
    var exists = this.state.biojslist.filter(function (aa) {
        return a.key[1] == aa.key[1];
      }).length > 0;
    if (!exists) {
      var newAdded = this.state.biojslist.concat([a]);
      var newFound = [];
      this.state.biojs.map(function (f) {

        if (f.key[1] === a.key[1]) {
          f.added = true;
        }
        newFound.push(f);
      });
      this.setState({biojslist: newAdded, biojs: newFound});
    }
  },
  changeBrand: function (e) {
    var newBrand = e.target.value;
    if (newBrand.length > 0) {
      this.setState({GALAXY_CONFIG_BRAND: newBrand})
    }
  },
  changeShed: function (e) {

    var newShed = sheds[parseInt(e.target.value)];
    this.setState({shed: newShed});
    doASearch(this);
  },
  removeFromAdded: function (a) {

    var newState = this.state.added.filter(function (aa) {
      return a != aa;
    });

    var newFound = [];
    this.state.found.map(function (f) {
      if (f.repo_owner_username === a.repo_owner_username && f.name === a.name) {
        f.added = false;
      }
      newFound.push(f);
    });

    this.setState({added: newState, found: newFound});
  },
  removeFromVis: function (a) {

    var newState = this.state.biojslist.filter(function (aa) {
      return a != aa;
    });

    var newFound = [];
    this.state.biojs.map(function (f) {
      if (f.key[1] === a.key[1]) {
        f.added = false;
      }
      newFound.push(f);
    });

    this.setState({biojslist: newState, biojs: newFound});
  },
  render: function () {
    var hiddenClass = 'hidden';
    var hiddenClassbiojs = 'hidden';
    var hiddenClassGeneral = 'hidden';
    if (this.state.added.length > 0) {
      hiddenClass = '';
      hiddenClassGeneral = '';
    }
    if (this.state.biojslist.length > 0) {
      hiddenClassbiojs = '';
      hiddenClassGeneral = '';
    }
    var i = 0;
    var images = this.state.images.map(function (value) {
      i++;
      return <option value={value.name} key={i}>{value.name}</option>
    });
    return (
      <div className="container">
        <Tabs>
          <Tabs.Panel title='Galaxy tools'>
            <h2>Please add repositories you would like to have in your Galaxy</h2>
            <div id="search">
              <SearchInput onSearchChange={this.onSearchChange} changeShed={this.changeShed}/>
              <Loading loading={this.state.loading} key="loading"/>
              <RepositoriesFound found={this.state.found} addToAdded={this.addToAdded}
                                 key="repositoriesFound"/>
            </div>
          </Tabs.Panel>
          <Tabs.Panel title='BioJS visualisations'>

            <div id="BioJs">
              <h2>Please add visualisations you would like to have in your Galaxy</h2>
              <BioJs biojs={this.state.biojs} addToAdded={this.addToVis}/>
            </div>
          </Tabs.Panel>
        </Tabs>
        <hr/>
        <h3>Config</h3>

        <div className="row">
          <div className="col12">
            <div >
              <label>Base galaxy image:</label>
              <select onChange={this.imageChange}>
                {images}
              </select>
            </div>
            <label>GALAXY_CONFIG_BRAND</label>
            <input type="text" placeholder="Galaxy" onChange={this.changeBrand}/>

            <label>Galaxy release</label>
            <select>
              <option>15.05</option>
            </select>
          </div>
        </div>

        <hr/>

        <div className={hiddenClassGeneral}>
          <div className="row">
            <div className="col12">
              <h3 className="no-margin-top">Your Galaxy will have the following:</h3>
            </div>
          </div>
          <div className="row">
            <div className="col8">
              <div className={hiddenClass}>
                <div id="repositories-added">
                  <h5>Galaxy tools</h5>
                  <RepositoriessList added={this.state.added}
                                     removeFromAdded={this.removeFromAdded}/>
                </div>
              </div>
              <div className={hiddenClassbiojs}>
                <div id="repositories-added">
                  <h5>BioJS visualisations</h5>
                  <Vislist biojslist={this.state.biojslist}
                           removeFromAdded={this.removeFromVis}/>
                </div>
              </div>
            </div>
            <div className="col4">
              <button className="button full-width"
                      onClick={generateDockerFile.bind(this,this.state)}>
                Give me a Docker
              </button>
              <button className="button full-width" disabled>Give me a VM</button>
              <button className="button full-width" disabled>Give me a Cloud</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
//RISE!!
ReactDOM.render(<FlavorApp/>, document.getElementById("app"));
