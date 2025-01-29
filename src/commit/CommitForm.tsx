import { useState } from "react";
import styled from "styled-components";
import { Button } from "../components/Button";
import { Select } from "../components/Select";
import { Input } from "../components/Input";
import { Label } from "../components/Label";

interface CommitFormProps {
  types: string[];
  scopes: string[];
}

const CommitForm: React.FC<CommitFormProps> = ({ types, scopes }) => {
  const [description, setDescription] = useState<string>("");

  return (
    <FormContainer>
      <Form>
        <Row>

          <Select label={"Type:"}>
          {types.map((type) => (
            <option key={type}>{type}</option>
          ))}
          </Select>
          <Select label={"Scope:"}>
            {scopes.map((scope) => (
              <option key={scope}>{scope}</option>
            ))}
          </Select>
        </Row>
        <Row>
          <Label>Short description:</Label>
          <Input value={description} onChange={(e) => setDescription(e.target.value)} />
        </Row>
        <Button>Save Commit Message</Button>
      </Form>
    </FormContainer>
  );
}

export default CommitForm;

const FormContainer = styled.div`
  background: #232533;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

const Row = styled.div`
  display: flex;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;



