import { Command, Flags } from "@oclif/core";
import { WordGenerator } from "slova";
import { color } from "@oclif/color";

export default class Word extends Command {
  static description =
    "Generate words with a certain length & amount of syllables.";

  static examples = [
    "<%= config.bin %> <%= command.id %> -l=10 -q=3 -s=3",
    "<%= config.bin %> <%= command.id %> --length 10 --quantity 3 --syllables 3",
  ];

  static flags = {
    length: Flags.string({
      char: "l",
      description: "Length of the word (default: 5)",
      default: "5",
      required: false,
    }),
    quantity: Flags.string({
      char: "q",
      description: "Amount of words to generate (default: 1)",
      default: "1",
      required: false,
    }),
    syllables: Flags.string({
      char: "s",
      description: "Amount of syllables in a word (default: length / 3)",
      required: false,
    }),
  };

  public async run(): Promise<void> {
    const { flags } = await this.parse(Word);
    this.log(`Generating ${color.cmd(flags.quantity === "1" ? "word" : "words")}...`);

    if (Number.isNaN(flags.length)) {
      this.error(
        `Finished an action with malformed flags: ${color.red(
          "Length has to be type of number"
        )}`
      );
    }

    if (!flags.syllables) {
      flags.syllables = (+flags.length / 3).toString();
    }

    if (
      Number.isNaN(flags.quantity) ||
      Number.isNaN(flags.syllables)
    ) {
      this.error(
        `Finished an action with malformed flags: ${color.red(
          "Quantity/Syllables have to be numbers"
        )}`
      );
    }

    const text = new WordGenerator({
      length: +flags.length,
      amount: +flags.quantity,
      syllables: +flags.syllables,
    }).generate();

    for (let i = 0; i < text.length; i++) {
      this.log(color.cmd(" »   ") + text[i]);
    }
  }
}
