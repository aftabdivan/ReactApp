import React from 'react';
import axios from 'axios';
import "./App.css"

export default class App extends React.Component {
  state = {
    persons: [],
    types: " ",
    selectedCheckboxes: []
  }

  // Make axios call to get all user details
  componentDidMount() {
    axios.get("http://www.mocky.io/v2/5d889c8a3300002c0ed7da42")
      .then(res => {
        const persons = res.data.items;
        this.setState({ persons });
      })
  }
  // for filter type according checkboxes
  check=()=>{
    let checkbox = document.getElementsByName("checkbox");
    for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].checked=true;
    }
  }
  handleOnClick = (e) => {
    //get all checkboxes value and add in array
    let checkbox = document.getElementsByName("checkbox");
    let value = [];
    for (let i = 0; i < checkbox.length; i++) {
      
      if (checkbox[i].checked && checkbox[i].value=="all") {
        value.push(checkbox[i].value);
        this.check()
      }
      else if (checkbox[i].checked) {
        value.push(checkbox[i].value);
      }
    }
    // set value in state
    this.setState({ selectedCheckboxes: value });
  }

  render() {

    const { selectedCheckboxes } = this.state;
    return (
      <div className='app'>
        <div className='checkboxs'>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="all" name="checkbox" onClick={this.handleOnClick} id="all" />
            <label class="form-check-label" for="all">
              All
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="0" name="checkbox" onClick={this.handleOnClick} id="type0" />
            <label class="form-check-label type0" for="type0">
              Type 0
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="1" name="checkbox" onClick={this.handleOnClick} id="type1" />
            <label class="form-check-label type1" for="type1">
              Type 1
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="2" name="checkbox" onClick={this.handleOnClick} id="type2" />
            <label class="form-check-label type2" for="type2">
              Type 2
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="3" name="checkbox" onClick={this.handleOnClick} id="type3" />
            <label class="form-check-label type3" for="type3">
              Type 3
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="4" name="checkbox" onClick={this.handleOnClick} id="type4" />
            <label class="form-check-label type4" for="type4">
              Type 4
            </label>
          </div>
        </div>
        <div className='tableData'>
          <table class="table table-sm">
            <thead class="thead-dark ">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Email</th>
                <th scope='col'>Name</th>
                <th scope="col">Wallet - 1</th>
                <th scope="col">Wallet - 2</th>
                <th scope="col">Wallet - 3</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.persons
                  .map((person) => {
                    let type;
                    if (person.type === 0) {
                      type = "table-info";
                    }
                    if (person.type === 1) {
                      type = "table-secondary";
                    }
                    if (person.type === 2) {
                      type = "table-success";
                    }
                    if (person.type === 3) {
                      type = "table-warning ";
                    }
                    if (person.type === 4) {
                      type = "table-danger";
                    }
                    if (selectedCheckboxes.length === 0 || selectedCheckboxes.includes("all")) {
                      return (
                        <tr >
                          <th scope="row" className={type}>{person.index}</th>
                          <td>{person.email}</td>
                          <td>{person.fullName}</td>
                          <td>{person.wallet1}</td>
                          <td>{person.wallet2}</td>
                          <td>{person.wallet3}</td>
                        </tr>
                      )
                    } else if (selectedCheckboxes.includes(JSON.stringify(person.type))) {
                      return (
                        <tr className={type}>
                          <th scope="row">{person.index}</th>

                          <td>{person.email}</td>
                          <td>{person.wallet1}</td>
                          <td>{person.wallet2}</td>
                          <td>{person.wallet3}</td>
                        </tr>
                      )
                    }
                  }
                  )
              }
            </tbody>
          </table>
        </div>
      </div>

    )
  }
}