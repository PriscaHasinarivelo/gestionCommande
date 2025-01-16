import React, { useState, useEffect } from "react";

function ListeTable({ listeTablesRestaurant }) {
  return (
    <>
      <div className="card mb-4">
        <div className="card-header">
          <i className="fas fa-chart-bar me-1"></i>
          Liste des tables
        </div>
        <div className="card-body card-body-table">
          <table className="table table-hover table-dark table-striped">
            <thead>
              <tr>
                <th>Numéro du table</th>
                <th></th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th>Total:</th>
                <th>{listeTablesRestaurant.length}</th>
              </tr>
            </tfoot>
            <tbody>
              {listeTablesRestaurant.map((item, index) => (
                <tr>
                  <td>{item.numero}</td>
                  <td>
                    <div className="row">
                      <div className="col-md-2">
                        <button
                          type="button"
                          className="btn btn-warning"
                          title="Table"
                        >
                          <i className="bi bi-shield-x" />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ListeTable;
