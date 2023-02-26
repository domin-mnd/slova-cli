import { Command, Flags } from "@oclif/core";
import { TextGenerator } from "slova";
import { color } from "@oclif/color";

export default class Text extends Command {
  static description =
    "Generate the text out of paragraphs with a certain length & amount of words.";

  static examples = [
    "<%= config.bin %> <%= command.id %> -l=150 -w=50 -p=3",
    "<%= config.bin %> <%= command.id %> --length 150 --words 50 --paragraphs 3",
  ];

  static flags = {
    length: Flags.string({
      char: "l",
      description: "Length of the text (default: 300)",
      default: "300",
      required: false,
    }),
    words: Flags.string({
      char: "w",
      description: "Amount of words in a text",
      default: "",
      required: false,
    }),
    paragraphs: Flags.string({
      char: "p",
      description: "Amount of paragraphs to generate (default: 1)",
      default: "1",
      required: false,
    }),
  };

  public async run(): Promise<void> {
    const { flags } = await this.parse(Text);
    this.log(`Generating ${color.cmd("text")}...`);

    if (
      Number.isNaN(flags.length) ||
      Number.isNaN(flags.words) ||
      Number.isNaN(flags.paragraphs)
    ) {
      this.error(
        `Finished an action with malformed flags: ${color.red(
          "Length/Words/Paragraphs have to be numbers"
        )}`
      );
    }

    const text = new TextGenerator({
      length: +flags.length,
      words: +flags.words,
      paragraphs: +flags.paragraphs,
    }).generate();

    for (let i = 0; i < text.length; i++) {
      this.log(color.cmd(" »   ") + text[i]);
    }
  }
}
