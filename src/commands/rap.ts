import { Command, Flags } from "@oclif/core";
import { MumbleRapGenerator } from "slova";
import { color } from "@oclif/color";

export default class MumbleRap extends Command {
  static description =
    "Generate mumble rap out of quatrains & chorus with a certain length.";

  static examples = [
    '<%= config.bin %> <%= command.id %> -s="q-c-q-c-q" -l=300',
    '<%= config.bin %> <%= command.id %> --scheme "q-c-q-c-q" --l 300',
  ];

  static flags = {
    length: Flags.string({
      char: "l",
      description: "Length of each quatrain & chorus (default: 150)",
      default: "150",
      required: false,
    }),
    scheme: Flags.string({
      char: "s",
      description:
        'Scheme of the rap where "q" stands for quatrain, "c" stands for chorus: a scheme is split by "-" (default: "q-c-q-q-c")',
      default: "q-c-q-q-c",
      required: false,
    }),
  };

  public async run(): Promise<void> {
    const { flags } = await this.parse(MumbleRap);
    this.log(`Generating ${color.cmd("mumble rap")}...`);

    const scheme = flags.scheme.split("-");
    const names = {
      q: "Quatrain",
      c: "Chorus",
    };

    // Check whether split element is either q or c
    if (scheme.some((qc: string) => !(qc in names))) {
      this.error(
        `Finished an action with malformed flags: ${color.red(
          'Scheme has to have q/c separated by "-"'
        )}`
      );
    }

    if (Number.isNaN(flags.length)) {
      this.error(
        `Finished an action with malformed flags: ${color.red(
          "Length have to be type of number"
        )}`
      );
    }

    const mumbleRap = new MumbleRapGenerator({
      length: +flags.length,
      scheme: flags.scheme,
    }).generate();

    for (let i = 0; i < mumbleRap.length; i++) {
      this.log(color.cmd(" »   ") + names[scheme[i] as "q" | "c"]);
      this.log(mumbleRap[i].join("\n"));
    }
  }
}
