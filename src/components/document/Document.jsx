import classes from "./document.module.css";

export default function Document() {
  return (
    <div className={classes.container}>
      <div className={classes.document}>
        <h2 className={classes.h2}>Lorem.</h2>
        <p className={classes.p}>Lorem ipsum dolor sit amet.</p>
        <p className={classes.p}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi tenetur
          ducimus facilis repudiandae reprehenderit.
        </p>
        <p className={classes.p}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores quis
          nihil corrupti aperiam! Delectus temporibus dolorem praesentium
          voluptatum aliquam consequatur tempore eaque quasi eligendi et sit
          vero, modi molestiae? Cum esse inventore maxime tempore doloribus
          placeat earum quo veritatis, fuga possimus eligendi non? Dolore,
          labore similique unde pariatur excepturi nam.
        </p>
      </div>
    </div>
  );
}
