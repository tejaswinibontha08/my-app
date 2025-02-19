import React from "react";
import { useParams } from "react-router-dom";

function DomainDetails() {
  const { domainName } = useParams();

  const getDomainDetails = (domain) => {
    switch (domain) {
      case "Film":
        return (
          <div>
            <h2>Film Domain</h2>
            <p>
              The Film domain encompasses all aspects of filmmaking, including
              writing, directing, cinematography, editing, and producing. Film
              creators collaborate to bring stories to life through visual
              storytelling, sound design, and editing techniques.
            </p>
            <ul>
              <li>Directing</li>
              <li>Cinematography</li>
              <li>Film Editing</li>
              <li>Sound Design</li>
              <li>Screenwriting</li>
            </ul>
          </div>
        );
      case "Music":
        return (
          <div>
            <h2>Music Domain</h2>
            <p>
              The Music domain covers everything related to the creation and
              production of music. From composing and arranging to performing and
              recording, the music domain is full of creativity and technical
              skills.
            </p>
            <ul>
              <li>Songwriting</li>
              <li>Music Production</li>
              <li>Performing</li>
              <li>Sound Engineering</li>
              <li>Mixing and Mastering</li>
            </ul>
          </div>
        );
      case "Direction":
        return (
          <div>
            <h2>Direction Domain</h2>
            <p>
              Direction involves guiding the creative vision of a project. It
              includes overseeing actors, cinematography, script interpretation,
              and the overall tone of a performance or film.
            </p>
            <ul>
              <li>Film Directing</li>
              <li>Stage Direction</li>
              <li>Television Direction</li>
              <li>Event Direction</li>
            </ul>
          </div>
        );
      case "Singing":
        return (
          <div>
            <h2>Singing Domain</h2>
            <p>
              Singing is the art of producing musical tones with the voice.
              This domain includes various vocal techniques, styles, and
              performances in different genres of music.
            </p>
            <ul>
              <li>Vocal Training</li>
              <li>Choral Singing</li>
              <li>Solo Performances</li>
              <li>Opera Singing</li>
              <li>Song Interpretation</li>
            </ul>
          </div>
        );
      case "Dancing":
        return (
          <div>
            <h2>Dancing Domain</h2>
            <p>
              Dancing is an art form that involves movement, rhythm, and
              expression. Dancers work across a wide range of styles and
              techniques, from classical ballet to contemporary and hip-hop.
            </p>
            <ul>
              <li>Ballet</li>
              <li>Contemporary Dance</li>
              <li>Hip-Hop Dance</li>
              <li>Jazz Dance</li>
              <li>Traditional Dance Styles</li>
            </ul>
          </div>
        );
      default:
        return <div>Invalid domain</div>;
    }
  };

  return (
    <div className="domain-details-container">
      {getDomainDetails(domainName)}
    </div>
  );
}

export default DomainDetails;
