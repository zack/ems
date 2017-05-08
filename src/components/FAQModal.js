import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const FAQModal = ({ show, onOpen, onClose }) => {
  return (
    <div>
      <Button
        bsStyle="primary"
        bsSize="large"
        onClick={onOpen}
      >
        Questions & Answers
      </Button>

      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <h3> Questions & Answers </h3>
        </Modal.Header>

        <Modal.Body>
          <h4> What do I do? </h4>
          <p>
            Type the words into the input boxes that correspond with the
            letter for the specified initialism or acronym.
          </p>

          <h4> What if there are multiple words or answers? </h4>
          <p>
            If the answers are synonyms (like "P" in "DCAPBLSTIC"), either/any
            word should work. If the answer is a collection of words (like "P"
            in "OPQRST") then you should enter both words in whatever way you
            choose. Punctuation and extra words/letters are generally ignored.
          </p>

          <h4> What about something like the five Ps?</h4>
          <p>
            Every input box will turn green for any correct "P" word. It will
            turn green if you enter "pain" five times. Just pick five different
            words.
          </p>

          <h4>
            Code?
          </h4>
          <p>
            <a href="https://github.com/zack/ems" target="_blank"> Yep! </a>
          </p>

          <h4>
            What's an initialism?
          </h4>
          <p>
            Another word for an acronym that isn't pronounced as a word, like
            "CHF" or "ABC."
          </p>

          <h4>
            What if I have questions, concerns, suggestions, or comments?
          </h4>
          <p>
            Drop me a line; I'd love to hear from you! I can be reached
            at <a href="mailto:zack@youngren.io">zack@youngren.io</a>.
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={onClose}> Close this thing </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default FAQModal;
