"use client";

import { useEffect, useState } from "react";
import { Heading } from "@/components/ui/typography";
import { Xylophone } from "@/feat/xylophone";
import api, { type Ability } from "@/api";
import AbilityButton from "@/components/ability-button";

export default function Abilities() {
  const [abilities, setAbilities] = useState<Ability[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await api.fetch();

      setAbilities(data.abilities);
    };

    fetch();
  }, []);

  return (
    <div className="flex flex-col flex-1 gap-4 items-center">
      <Heading variant="h1">What can I do for you?</Heading>
      <ul className="list-disc">
        <li>Craft distinctive memorable websites</li>
        <li>Conceive thoughtful prototypes and wireframes</li>
        <li>Develop scalable fullstack applications</li>
        <li>Provide translation services</li>
      </ul>
      <Xylophone bars={abilities.length}>
        <div className="flex gap-2">
          { abilities.map(a => <AbilityButton key={a.id} data={a} />) }
        </div>
      </Xylophone>
    </div>
  );
}
