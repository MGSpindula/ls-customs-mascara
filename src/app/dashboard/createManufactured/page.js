import AddManufacturedClient from './AddManufacturedClient';
import { handleSubmit, handleSearch } from './actions';

export default function CreateManufactured() {
  return <AddManufacturedClient onSubmit={handleSubmit} onSearch={handleSearch} />;
}
