import { useGame, useGameActions } from '../store';
import { useRandomInterval } from '../utils';

export default function Hud() {
    const health = useGame((s) => s.health);
    const { changeHealth } = useGameActions();

    useRandomInterval(() => changeHealth(-5), 10000, 12000);

    return <div className="healthbar">Health : {health}</div>;
}
