import {
  Button,
  DrawerBody,
  Label,
  Textarea,
} from "@fluentui/react-components";
import { useAddNote } from "src/api/Notes/notesApi";
import { Person, PeoplePicker } from "src/components/PeoplePicker/PeoplePicker";
import { ContactIcon, TextFieldIcon } from "@fluentui/react-icons-mdl2";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSendEmail } from "src/api/Email/emailApi";
import { usePCOL } from "src/api/PCOL/usePCOL";

declare const _spPageContextInfo: {
  userId: number;
  userDisplayName: string;
  userEmail: string;
  userLoginName: string;
  webAbsoluteUrl: string;
};

const NotesForm = ({
  isOpen,
  closeDrawer,
}: {
  isOpen: boolean;
  closeDrawer: () => void;
}) => {
  const { program, pcolId } = useParams();
  const pcol = usePCOL(String(program), Number(pcolId));
  const addNote = useAddNote(String(program), Number(pcolId));
  const sendMail = useSendEmail();

  const [toSelections, setToSelections] = useState<Person[]>([]);
  const [ccSelections, setCcSelections] = useState<Person[]>([]);
  const [newNoteText, setNewNoteText] = useState("");

  const subject = "PCOL note added to: " + pcol.data?.Title;

  const body =
    `A new note has been added by ${_spPageContextInfo.userDisplayName}<br><br>` +
    `Link to pcol: <a href="${_spPageContextInfo.webAbsoluteUrl}/app/index.aspx#/p/${program}/i/${pcolId}">` +
    `${_spPageContextInfo.webAbsoluteUrl}/app/index.aspx#/p/${program}/i/${pcolId}</a><br><br>` +
    `Note contents:<br>${newNoteText}`;

  if (
    !isOpen &&
    (toSelections.length > 0 || ccSelections.length > 0 || newNoteText)
  ) {
    setToSelections([]);
    setCcSelections([]);
    setNewNoteText("");
  }

  return (
    <DrawerBody>
      <Label id="To" weight="semibold" className="fieldLabel">
        <ContactIcon className="fieldIcon" />
        To
      </Label>
      <PeoplePicker
        ariaLabel="To"
        aria-labelledby="To"
        selectedItems={toSelections}
        itemLimit={10}
        updatePeople={(items) => {
          if (items?.[0]?.Title) {
            setToSelections(items);
          } else {
            setToSelections([]);
          }
        }}
      />
      <br />

      <Label id="Cc" weight="semibold" className="fieldLabel">
        <ContactIcon className="fieldIcon" />
        Cc
      </Label>
      <PeoplePicker
        ariaLabel="Cc"
        aria-labelledby="Cc"
        selectedItems={ccSelections}
        itemLimit={10}
        updatePeople={(items) => {
          if (items?.[0]?.Title) {
            setCcSelections(items);
          } else {
            setCcSelections([]);
          }
        }}
      />
      <br />

      <Label id="Body" weight="semibold" className="fieldLabel">
        <TextFieldIcon className="fieldIcon" />
        Body
      </Label>
      <Textarea
        id="Body"
        style={{ width: "100%" }}
        placeholder="New note text. Up to 2000 characters."
        resize="vertical"
        rows={10}
        value={newNoteText}
        onChange={(_ev, data) => setNewNoteText(data.value)}
        maxLength={2000}
      />
      <br />

      <div style={{ width: "100%", display: "flex" }}>
        <Button disabled={addNote.isPending} onClick={() => closeDrawer()}>
          Cancel
        </Button>
        <Button
          appearance="primary"
          style={{ marginLeft: "auto" }}
          disabled={addNote.isPending}
          onClick={() => {
            addNote.mutateAsync(newNoteText).then(() => {
              closeDrawer();
              if (toSelections.length > 0 || ccSelections.length > 0) {
                const email = {
                  To: [] as string[],
                  CC: [] as string[],
                  Subject: subject,
                  Body: body,
                  pcolId: String(pcolId),
                  Program: String(program),
                };
                toSelections.forEach((person) => email.To.push(person.EMail));
                ccSelections.forEach((person) => email.CC.push(person.EMail));
                sendMail.mutate(email);
              }
              addNote.reset();
            });
          }}
        >
          Save
        </Button>
      </div>
    </DrawerBody>
  );
};

export default NotesForm;
