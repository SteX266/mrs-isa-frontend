import React from "react";
import { Table, Button } from "react-bootstrap";

export default function ServiceTable(props) {
  return (
    <Table striped hover className="rounded">
      <TableHeader headers={props.headers}></TableHeader>
      <TableBody
        type={props.type}
        onDelete={props.onDelete}
        services={props.services}
      ></TableBody>
    </Table>
  );
}

function TableHeader(props) {
  return (
    <thead>
      <tr>
        {props.headers.map((header, index) => (
          <th style={{ "text-align": "center" }} key={index}>
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
}

function TableBody(props) {
  return (
    <tbody>
      {props.services.map((service) => (
        <EditableTableRow
          onDelete={props.onDelete}
          key={service.id}
          service={service}
          type={props.type}
        ></EditableTableRow>
      ))}
    </tbody>
  );
}

function EditableTableRow(props) {
  let names = Object.getOwnPropertyNames(props.service);

  return (
    <tr id={props.service.id}>
      {names.map((n, index) => {
        if (n !== "id") {
          let text = props.service[n];
          if (n === "price") {
            text += "$";
          }

          return (
            <td style={{ "text-align": "center" }} key={index}>
              {text}
            </td>
          );
        }
      })}
      <td>
        <Button href={`edit/${props.service.id}`} variant="outline-dark">
          Edit
        </Button>
      </td>
      <td>
        <Button
          id={props.service.id}
          onClick={() => props.onDelete(props.service.id)}
          variant="outline-dark"
        >
          Delete
        </Button>
      </td>
    </tr>
  );
}
