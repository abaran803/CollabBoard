// Import all models
import { User } from './Users.model';
import { Board } from './Boards.model';
import { BoardMember } from './BoardMembers.model';
import { List } from './Lists.model';
import { Card } from './Cards.model';
import { CardMember } from './CardMembers.model';
import { Comment } from './Comments.model';
import { Label } from './Labels.model';
import { CardLabel } from './CardLabels.model';
import { Attachment } from './Attachments.model';
import { Activity } from './Activities.model';

// 🔗 Associations

// User ↔ Boards
User.hasMany(Board, { foreignKey: 'created_by' });
Board.belongsTo(User, { foreignKey: 'created_by' });

// Board ↔ Lists
Board.hasMany(List, { foreignKey: 'board_id', onDelete: 'CASCADE' });
List.belongsTo(Board, { foreignKey: 'board_id' });

// List ↔ Cards
List.hasMany(Card, { foreignKey: 'list_id', onDelete: 'CASCADE' });
Card.belongsTo(List, { foreignKey: 'list_id' });

// Board ↔ Members (many-to-many)
Board.belongsToMany(User, {
  through: BoardMember,
  foreignKey: 'board_id',
  otherKey: 'user_id',
});
User.belongsToMany(Board, {
  through: BoardMember,
  foreignKey: 'user_id',
  otherKey: 'board_id',
});

// Card ↔ Members (many-to-many)
Card.belongsToMany(User, {
  through: CardMember,
  foreignKey: 'card_id',
  otherKey: 'user_id',
});
User.belongsToMany(Card, {
  through: CardMember,
  foreignKey: 'user_id',
  otherKey: 'card_id',
});

// Card ↔ Comments
Card.hasMany(Comment, { foreignKey: 'card_id', onDelete: 'CASCADE' });
Comment.belongsTo(Card, { foreignKey: 'card_id' });
User.hasMany(Comment, { foreignKey: 'user_id' });
Comment.belongsTo(User, { foreignKey: 'user_id' });

// Board ↔ Labels
Board.hasMany(Label, { foreignKey: 'board_id', onDelete: 'CASCADE' });
Label.belongsTo(Board, { foreignKey: 'board_id' });

// Card ↔ Labels (many-to-many)
Card.belongsToMany(Label, {
  through: CardLabel,
  foreignKey: 'card_id',
  otherKey: 'label_id',
});
Label.belongsToMany(Card, {
  through: CardLabel,
  foreignKey: 'label_id',
  otherKey: 'card_id',
});

// Card ↔ Attachments
Card.hasMany(Attachment, { foreignKey: 'card_id', onDelete: 'CASCADE' });
Attachment.belongsTo(Card, { foreignKey: 'card_id' });

// Board ↔ Activities
Board.hasMany(Activity, { foreignKey: 'board_id', onDelete: 'CASCADE' });
Activity.belongsTo(Board, { foreignKey: 'board_id' });
Activity.belongsTo(User, { foreignKey: 'user_id' });

export {
  User,
  Board,
  BoardMember,
  List,
  Card,
  CardMember,
  Comment,
  Label,
  CardLabel,
  Attachment,
  Activity,
};
