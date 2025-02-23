import { useGame } from '../store';

export default function Hud() {
    const health = useGame((s) => s.health);

    return <div className="healthbar">Health : {health}</div>;
}
