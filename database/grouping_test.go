package database

import (
	"github.com/statping/statping/utils"
	"testing"
	"time"
)

func TestTimeVar_FillMissing(t *testing.T) {


	Start:=     time.Unix(utils.ToInt("1627669800"), 0).Local()
	End:=       time.Unix(utils.ToInt("1630261799"), 0).Local()

	group,_ := time.ParseDuration("24h")
	temp := &TimeVar{g: &GroupQuery{Group: group,},}

	temp.FillMissing(Start, End)
}
